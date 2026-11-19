'use strict';

/*
 * Messaggio WhatsApp giornaliero
 * ------------------------------
 * Si collega a WhatsApp come "dispositivo collegato" (come WhatsApp Web) e
 * ogni giorno, all'orario scritto in impostazioni.txt, invia al gruppo
 * indicato il testo contenuto in messaggio.txt.
 *
 *   node index.js           avvio normale (lo usa avvia.bat)
 *   node index.js --prova   prova: invia il messaggio solo a te stesso (lo usa prova.bat)
 *
 * I file impostazioni.txt e messaggio.txt vengono riletti a ogni controllo:
 * se li modifichi non serve riavviare il programma.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const QRCode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');

const CARTELLA = __dirname;
const FILE_IMPOSTAZIONI = path.join(CARTELLA, 'impostazioni.txt');
const FILE_MESSAGGIO = path.join(CARTELLA, 'messaggio.txt');
const FILE_ULTIMO_INVIO = path.join(CARTELLA, 'ultimo-invio.txt');
const FILE_REGISTRO = path.join(CARTELLA, 'registro.txt');
const FILE_QR = path.join(CARTELLA, 'codice-qr.html');
const CARTELLA_SESSIONE = path.join(CARTELLA, 'sessione-whatsapp');

const FUSO_ORARIO = 'Europe/Rome';
const CONTROLLO_OGNI_MS = 30 * 1000;
const RIPROVA_DOPO_MS = 2 * 60 * 1000;
const RITARDO_MASSIMO_PREDEFINITO = 30;
const ULTIMO_MINUTO_DEL_GIORNO = 23 * 60 + 59;

// Codice di uscita che dice ad avvia.bat di NON riavviare il programma
// (impostazioni da correggere): riavviarlo non servirebbe a nulla.
const USCITA_IMPOSTAZIONI_ERRATE = 2;

const MODALITA_PROVA = process.argv.includes('--prova');

class ErroreImpostazioni extends Error {}

// ---------------------------------------------------------------------------
// Registro
// ---------------------------------------------------------------------------

function dataOraLeggibile() {
  return new Date().toLocaleString('it-IT', { timeZone: FUSO_ORARIO });
}

function log(testo) {
  const riga = `[${dataOraLeggibile()}] ${testo}`;
  console.log(riga);
  try {
    fs.appendFileSync(FILE_REGISTRO, riga + '\r\n', 'utf8');
  } catch (_) {
    // Il registro è solo un aiuto: se non si riesce a scriverlo si va avanti.
  }
}

// ---------------------------------------------------------------------------
// Lettura dei file di impostazioni e messaggio
// ---------------------------------------------------------------------------

function leggiFileTesto(file) {
  const dati = fs.readFileSync(file);
  let testo = dati.toString('utf8');
  // Un file salvato da un vecchio Blocco note in "ANSI" non è UTF-8 valido:
  // in quel caso lo rileggiamo come Latin-1 per non rovinare le lettere accentate.
  if (testo.includes('�')) testo = dati.toString('latin1');
  return testo.replace(/^﻿/, '');
}

function leggiImpostazioni() {
  if (!fs.existsSync(FILE_IMPOSTAZIONI)) {
    throw new ErroreImpostazioni('Non trovo il file impostazioni.txt nella cartella del programma.');
  }

  const valori = {};
  for (const riga of leggiFileTesto(FILE_IMPOSTAZIONI).split(/\r?\n/)) {
    const pulita = riga.trim();
    if (!pulita || pulita.startsWith('#')) continue;
    const uguale = pulita.indexOf('=');
    if (uguale === -1) continue;
    valori[pulita.slice(0, uguale).trim().toUpperCase()] = pulita.slice(uguale + 1).trim();
  }

  const gruppo = valori.GRUPPO || '';
  if (!gruppo) {
    throw new ErroreImpostazioni('In impostazioni.txt manca il nome del gruppo: scrivilo dopo "GRUPPO=".');
  }

  const orarioScritto = valori.ORARIO || '';
  const parti = /^(\d{1,2})[:.](\d{2})$/.exec(orarioScritto);
  const ore = parti ? Number(parti[1]) : NaN;
  const minuti = parti ? Number(parti[2]) : NaN;
  if (!parti || ore > 23 || minuti > 59) {
    throw new ErroreImpostazioni(
      `In impostazioni.txt l'orario "${orarioScritto}" non è valido: scrivilo come ore:minuti, per esempio ORARIO=08:00.`,
    );
  }

  let ritardoMassimo = RITARDO_MASSIMO_PREDEFINITO;
  if (valori.RITARDO_MASSIMO_MINUTI) {
    ritardoMassimo = Number(valori.RITARDO_MASSIMO_MINUTI);
    if (!Number.isInteger(ritardoMassimo) || ritardoMassimo < 0) {
      throw new ErroreImpostazioni(
        'In impostazioni.txt RITARDO_MASSIMO_MINUTI deve essere un numero intero di minuti, per esempio 30.',
      );
    }
  }

  return {
    gruppo,
    minutoDiInvio: ore * 60 + minuti,
    orarioTesto: `${String(ore).padStart(2, '0')}:${String(minuti).padStart(2, '0')}`,
    ritardoMassimo,
  };
}

function leggiMessaggio() {
  if (!fs.existsSync(FILE_MESSAGGIO)) {
    throw new ErroreImpostazioni('Non trovo il file messaggio.txt nella cartella del programma.');
  }
  const testo = leggiFileTesto(FILE_MESSAGGIO).replace(/\r\n/g, '\n').trim();
  if (!testo) {
    throw new ErroreImpostazioni('Il file messaggio.txt è vuoto: scrivi al suo interno il testo da inviare e salvalo.');
  }
  return testo;
}

// ---------------------------------------------------------------------------
// Orari (sempre ora italiana, qualunque sia il fuso impostato sul PC)
// ---------------------------------------------------------------------------

const formatoOraItaliana = new Intl.DateTimeFormat('en-GB', {
  timeZone: FUSO_ORARIO,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function adessoInItalia() {
  const p = {};
  for (const parte of formatoOraItaliana.formatToParts(new Date())) p[parte.type] = parte.value;
  return {
    data: `${p.year}-${p.month}-${p.day}`,
    minutoDelGiorno: Number(p.hour) * 60 + Number(p.minute),
  };
}

function fineFinestraDiInvio(imp) {
  return Math.min(imp.minutoDiInvio + imp.ritardoMassimo, ULTIMO_MINUTO_DEL_GIORNO);
}

function leggiUltimoInvio() {
  try {
    return fs.readFileSync(FILE_ULTIMO_INVIO, 'utf8').trim();
  } catch (_) {
    return '';
  }
}

function salvaUltimoInvio(data) {
  fs.writeFileSync(FILE_ULTIMO_INVIO, data + '\r\n', 'utf8');
}

function descriviProssimoInvio(imp) {
  const ora = adessoInItalia();
  if (leggiUltimoInvio() === ora.data || ora.minutoDelGiorno > fineFinestraDiInvio(imp)) {
    return `domani alle ${imp.orarioTesto}`;
  }
  if (ora.minutoDelGiorno < imp.minutoDiInvio) return `oggi alle ${imp.orarioTesto}`;
  return 'adesso (l\'orario di oggi è appena passato)';
}

// ---------------------------------------------------------------------------
// WhatsApp
// ---------------------------------------------------------------------------

const opzioniBrowser = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};
if (process.env.CHROME_PATH) opzioniBrowser.executablePath = process.env.CHROME_PATH;

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: CARTELLA_SESSIONE }),
  puppeteer: opzioniBrowser,
});

function normalizzaNome(nome) {
  return (nome || '').normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase();
}

async function trovaGruppo(nomeCercato) {
  const chat = await client.getChats();
  const gruppi = chat.filter((c) => c.isGroup);
  const cercato = normalizzaNome(nomeCercato);
  return {
    gruppo: gruppi.find((g) => normalizzaNome(g.name) === cercato),
    nomiGruppi: gruppi.map((g) => g.name).filter(Boolean),
  };
}

function avvisaGruppoNonTrovato(nomeCercato, nomiGruppi) {
  log(`ATTENZIONE: non trovo nessun gruppo chiamato "${nomeCercato}".`);
  if (nomiGruppi.length) {
    log('Questi sono i gruppi che vedo: copia il nome giusto in impostazioni.txt, dopo "GRUPPO=".');
    for (const nome of nomiGruppi.sort((a, b) => a.localeCompare(b, 'it'))) console.log(`    - ${nome}`);
  } else {
    log('Non vedo ancora nessun gruppo: se hai appena collegato WhatsApp, attendi qualche minuto e riprova.');
  }
}

let paginaQrAperta = false;

function paginaHtml(titolo, corpo, aggiornaOgniSecondi) {
  const aggiorna = aggiornaOgniSecondi ? `<meta http-equiv="refresh" content="${aggiornaOgniSecondi}">` : '';
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8">${aggiorna}
<title>${titolo}</title>
<style>
  body { font-family: system-ui, "Segoe UI", sans-serif; max-width: 560px; margin: 40px auto; padding: 0 16px;
         text-align: center; color: #111; background: #fff; line-height: 1.5; }
  img { width: 320px; height: 320px; image-rendering: pixelated; }
  ol { text-align: left; }
</style></head><body>${corpo}</body></html>`;
}

function apriFile(file) {
  let comando;
  if (process.platform === 'win32') comando = `start "" "${file}"`;
  else if (process.platform === 'darwin') comando = `open "${file}"`;
  else comando = `xdg-open "${file}"`;
  exec(comando, () => {});
}

async function mostraCodiceQr(qr) {
  console.log('');
  if (!paginaQrAperta) log('Serve collegare WhatsApp a questo PC (solo la prima volta).');
  console.log('  Sull\'iPhone apri WhatsApp > Impostazioni > Dispositivi collegati > Collega un dispositivo');
  console.log('  e inquadra il codice qui sotto, oppure quello nella pagina che si apre nel browser.');
  console.log('  Il codice cambia ogni 20 secondi circa: se non funziona, inquadra quello nuovo.\n');
  console.log(await QRCode.toString(qr, { type: 'terminal', small: true }));

  const immagine = await QRCode.toDataURL(qr, { width: 400, margin: 2 });
  fs.writeFileSync(
    FILE_QR,
    paginaHtml(
      'Collega WhatsApp',
      `<h1>Collega WhatsApp</h1>
       <ol>
         <li>Sull'iPhone apri <b>WhatsApp</b> &gt; <b>Impostazioni</b> &gt; <b>Dispositivi collegati</b>.</li>
         <li>Tocca <b>Collega un dispositivo</b> e inquadra questo codice.</li>
       </ol>
       <img src="${immagine}" alt="Codice QR per collegare WhatsApp">
       <p>La pagina si aggiorna da sola ogni 5 secondi.</p>`,
      5,
    ),
    'utf8',
  );
  if (!paginaQrAperta) {
    paginaQrAperta = true;
    apriFile(FILE_QR);
  }
}

function segnaCollegato() {
  try {
    if (fs.existsSync(FILE_QR)) {
      fs.writeFileSync(
        FILE_QR,
        paginaHtml('WhatsApp collegato', '<h1>WhatsApp è collegato</h1><p>Puoi chiudere questa pagina.</p>'),
        'utf8',
      );
    }
  } catch (_) {
    // Non importante.
  }
}

// ---------------------------------------------------------------------------
// Invio giornaliero
// ---------------------------------------------------------------------------

let invioInCorso = false;
let prossimoTentativo = 0;

async function controllaSeInviare() {
  if (invioInCorso || Date.now() < prossimoTentativo) return;

  let imp;
  try {
    imp = leggiImpostazioni();
  } catch (errore) {
    if (!(errore instanceof ErroreImpostazioni)) throw errore;
    log(`ATTENZIONE: ${errore.message}`);
    prossimoTentativo = Date.now() + RIPROVA_DOPO_MS;
    return;
  }

  const ora = adessoInItalia();
  if (leggiUltimoInvio() === ora.data) return;
  if (ora.minutoDelGiorno < imp.minutoDiInvio || ora.minutoDelGiorno > fineFinestraDiInvio(imp)) return;

  invioInCorso = true;
  try {
    const testo = leggiMessaggio();
    const { gruppo, nomiGruppi } = await trovaGruppo(imp.gruppo);
    if (!gruppo) {
      avvisaGruppoNonTrovato(imp.gruppo, nomiGruppi);
      log('Riprovo tra 2 minuti.');
      prossimoTentativo = Date.now() + RIPROVA_DOPO_MS;
      return;
    }
    await gruppo.sendMessage(testo);
    salvaUltimoInvio(ora.data);
    log(`Messaggio inviato al gruppo "${gruppo.name}". Prossimo invio domani alle ${imp.orarioTesto}.`);
  } catch (errore) {
    log(`Invio non riuscito: ${errore.message}. Riprovo tra 2 minuti.`);
    prossimoTentativo = Date.now() + RIPROVA_DOPO_MS;
  } finally {
    invioInCorso = false;
  }
}

let pianificazioneAvviata = false;

async function avviaPianificazione() {
  if (pianificazioneAvviata) return;
  pianificazioneAvviata = true;

  const imp = leggiImpostazioni();
  const { gruppo, nomiGruppi } = await trovaGruppo(imp.gruppo);
  if (gruppo) log(`Gruppo trovato: "${gruppo.name}".`);
  else avvisaGruppoNonTrovato(imp.gruppo, nomiGruppi);

  log(`Il messaggio viene inviato ogni giorno alle ${imp.orarioTesto}. Prossimo invio: ${descriviProssimoInvio(imp)}.`);
  log('Lascia aperta questa finestra (puoi ridurla a icona). Se la chiudi, il programma si ferma.');

  const controlla = () => controllaSeInviare().catch((e) => log(`Errore imprevisto: ${e.message}`));
  await controlla();
  setInterval(controlla, CONTROLLO_OGNI_MS);
}

async function eseguiProva() {
  try {
    const imp = leggiImpostazioni();
    const testo = leggiMessaggio();
    const { gruppo, nomiGruppi } = await trovaGruppo(imp.gruppo);
    if (!gruppo) {
      avvisaGruppoNonTrovato(imp.gruppo, nomiGruppi);
      log('PROVA NON RIUSCITA: correggi il nome del gruppo in impostazioni.txt, salva e rifai la prova.');
      return esci(USCITA_IMPOSTAZIONI_ERRATE);
    }

    const ioStesso = client.info.wid._serialized;
    await client.sendMessage(
      ioStesso,
      `Prova del messaggio giornaliero riuscita.\nGruppo trovato: "${gruppo.name}".\n` +
        `Ogni giorno alle ${imp.orarioTesto} il gruppo riceverà il messaggio qui sotto:`,
    );
    await client.sendMessage(ioStesso, testo);

    log('PROVA RIUSCITA.');
    log(`Il gruppo "${gruppo.name}" esiste. Il gruppo NON ha ricevuto niente.`);
    log('Su WhatsApp apri la chat con te stesso ("Tu"): trovi il messaggio esattamente come arriverà al gruppo.');
    log('Ora puoi avviare il programma con avvia.bat.');
    // Lascia a WhatsApp il tempo di consegnare i messaggi prima di chiudere.
    await new Promise((fatto) => setTimeout(fatto, 8000));
    return esci(0);
  } catch (errore) {
    if (errore instanceof ErroreImpostazioni) {
      log(`ATTENZIONE: ${errore.message}`);
      return esci(USCITA_IMPOSTAZIONI_ERRATE);
    }
    log(`PROVA NON RIUSCITA: ${errore.message}`);
    return esci(1);
  }
}

// ---------------------------------------------------------------------------
// Avvio e chiusura
// ---------------------------------------------------------------------------

async function esci(codice) {
  try {
    await client.destroy();
  } catch (_) {
    // Il browser potrebbe essere già chiuso.
  }
  process.exit(codice);
}

client.on('qr', (qr) => {
  mostraCodiceQr(qr).catch((e) => log(`Non riesco a mostrare il codice QR: ${e.message}`));
});

client.on('authenticated', () => log('Accesso a WhatsApp riuscito, caricamento in corso...'));

client.on('auth_failure', (motivo) => {
  log(`Accesso a WhatsApp non riuscito (${motivo}). Al prossimo avvio inquadra di nuovo il codice QR.`);
  esci(1);
});

client.on('ready', () => {
  segnaCollegato();
  log('WhatsApp è collegato e pronto.');
  const passo = MODALITA_PROVA ? eseguiProva() : avviaPianificazione();
  passo.catch((errore) => {
    if (errore instanceof ErroreImpostazioni) {
      log(`ATTENZIONE: ${errore.message}`);
      return esci(USCITA_IMPOSTAZIONI_ERRATE);
    }
    log(`Errore imprevisto: ${errore.message}. Il programma verrà riavviato.`);
    return esci(1);
  });
});

client.on('disconnected', (motivo) => {
  if (motivo === 'LOGOUT') {
    // WhatsApp ricarica da solo la pagina di collegamento e mostra un nuovo codice QR.
    log('Questo PC è stato scollegato da WhatsApp. Per ricollegarlo inquadra di nuovo il codice QR.');
    paginaQrAperta = false;
    return;
  }
  log(`WhatsApp si è disconnesso (${motivo}). Il programma verrà riavviato.`);
  esci(1);
});

process.on('SIGINT', () => {
  log('Chiusura del programma...');
  esci(0);
});

process.on('unhandledRejection', (errore) => {
  log(`Errore imprevisto: ${errore && errore.message ? errore.message : errore}`);
});

function avvia() {
  log(MODALITA_PROVA ? '=== PROVA del messaggio giornaliero ===' : '=== Messaggio WhatsApp giornaliero ===');
  try {
    const imp = leggiImpostazioni();
    leggiMessaggio();
    log(`Gruppo: "${imp.gruppo}"  -  orario di invio: ${imp.orarioTesto}`);
  } catch (errore) {
    if (!(errore instanceof ErroreImpostazioni)) throw errore;
    log(`ATTENZIONE: ${errore.message}`);
    log('Correggi il file, salvalo e riavvia il programma.');
    process.exit(USCITA_IMPOSTAZIONI_ERRATE);
  }

  log('Mi collego a WhatsApp... (può richiedere un minuto)');
  client.initialize().catch((errore) => {
    log(`Non riesco ad avviare WhatsApp: ${errore.message}`);
    esci(1);
  });
}

avvia();
