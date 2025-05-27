// src/slidesData.js
export const slides = [
  {
    id: 1,
    title: "Zurigò Auto - Panoramica delle Garanzie Assicurative",
    content: () => (
      <>
        <p style={{ textAlign: 'center', fontSize: '1.8em', color: '#003366', fontWeight: 'bold', marginBottom: '30px' }}>
          Zurigò Auto
        </p>
        <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
          Questa presentazione illustra le principali garanzie offerte dalla polizza Zurigò Auto, distinguendo tra coperture base (R.C. Auto obbligatoria) e garanzie opzionali (Altri Rischi Diversi - ARD) che puoi scegliere per personalizzare la tua protezione.
        </p>
        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.5em', color: '#0066cc' }}>Zurich</p>
      </>
    )
  },
  {
    id: 2,
    title: "Responsabilità Civile Auto (R.C.A.) - LA BASE",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Base (Obbligatoria per Legge)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Copre i danni involontariamente causati a terzi (persone, animali, cose) dalla circolazione del veicolo.</li>
          <li>Valida su strade pubbliche, aree equiparate e aree private.</li>
          <li>Include danni derivanti da <strong>Attacchi Cyber</strong>.</li>
          <li>Risarcimento fino ai massimali di legge o quelli superiori scelti in polizza (minimi di legge: 6.450.000 € per persone, 1.300.000 € per cose).</li>
        </ul>
        <h3>Estensioni/Specifiche della R.C.A. Base:</h3>
        <ul>
          <li><strong>Responsabilità civile dei trasportati:</strong> Danni che i trasportati possono provocare a terzi (esclusi danni al conducente/veicolo).</li>
          <li><strong>Ricorso terzi da Incendio:</strong> Danni a terzi da incendio/esplosione/scoppio del veicolo in sosta su aree private (limite 500.000 €, di cui 50.000 € per interruzione attività).</li>
          <li><strong>Responsabilità del Proprietario non conducente:</strong> Copertura per danni a terzi se il veicolo è usato a sua insaputa da conducente non abilitato/ebbro/con trasporto non conforme.</li>
          <li><strong>Responsabilità civile per fatto di figli minori:</strong> Danni da circolazione illecita dell'auto da parte di figli minori all'insaputa dell'assicurato.</li>
          <li><strong>Responsabilità conducente in stato di ebbrezza (lieve):</strong> Copertura se tasso alcolemico ≤ 1,2 g/l (possibile rivalsa Zurich per tassi superiori).</li>
          <li><strong>Patente non rinnovata:</strong> Danni da conducente con patente scaduta da oltre 6 mesi e rinnovata entro 6 mesi dal sinistro.</li>
          <li><strong>Danni da operazioni di salita/discesa persone disabili:</strong> Per veicoli allestiti, copre danni a terzi durante tali operazioni.</li>
          <li><strong>Danni cagionati dal gancio traino (omologato):</strong> Danni involontariamente causati a terzi dal gancio traino stesso.</li>
          <li><strong>Autovetture adibite a scuola guida:</strong> Copre la responsabilità dell'istruttore.</li>
          <li><strong>Danni a cose di terzi trasportati su autotassametri o autovetture a noleggio con conducente:</strong> Copre indumenti/oggetti personali dei trasportati (fino a 250 €).</li>
        </ul>
      </>
    )
  },
  {
    id: 3,
    title: "R.C. Auto - OPZIONI AGGIUNTIVE (A Pagamento)",
    content: () => (
      <>
        <h3>Personalizzazione Tipo di Guida:</h3>
        <p><strong>Tipo:</strong> Opzionale (configurazione della R.C.A.)</p>
        <p><strong>Opzioni:</strong></p>
        <ul>
          <li><strong>Guida Definita:</strong> Conducenti dai 25 anni in su senza franchigia. Età inferiori dichiarate; se guida un conducente più giovane non dichiarato, si applica franchigia.</li>
          <li><strong>Guida Libera:</strong> Qualsiasi conducente abilitato.</li>
        </ul>
        <h3>Classe Protetta (R.C.A.):</h3>
        <p><strong>Tipo:</strong> Opzionale</p>
        <p><strong>Caratteristiche:</strong> Il primo sinistro con responsabilità liquidato nell'annualità di polizza non comporta il peggioramento della classe di merito Bonus/Malus.</p>
        <h3>Danni cagionati dal rimorchio trainato (R.C.A.):</h3>
        <p><strong>Tipo:</strong> Opzionale</p>
        <p><strong>Caratteristiche:</strong> Se il gancio traino è omologato, estende la copertura R.C.A. ai danni causati dal traino di rimorchi con targa propria regolarmente agganciati (es. roulotte).</p>
        <h3>Aumento Massimali minimi (R.C.A.):</h3>
        <p><strong>Tipo:</strong> Opzionale</p>
        <p><strong>Caratteristiche:</strong> Permette di aumentare i massimali di risarcimento della R.C.A. oltre i minimi di legge.</p>
      </>
    )
  },
  {
    id: 4,
    title: "Garanzia INCENDIO, FURTO E SALVASPESE",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Indennizza danni materiali e diretti al veicolo (inclusi Attacchi Cyber) per:
            <ul>
              <li>Incendio (anche da atti vandalici/eventi sociopolitici, circolazione abusiva, caduta "corpi orbitanti").</li>
              <li>Esplosione, Scoppio, Fulmine.</li>
              <li>Furto o Rapina (consumati o tentati).</li>
            </ul>
          </li>
          <li>Include danni ad apparecchi audiofonovisivi (fino al 20% dei valori assicurati, max 5.000 €).</li>
          <li><strong>Per veicoli elettrici/ibridi plug-in:</strong> Danni ai cavi di alimentazione durante la ricarica (anche quelli interni al veicolo).</li>
        </ul>
        <h3>Opzioni "Salvaspese" (prestazioni di rimborso spese accessorie):</h3>
        <ul>
          <li><strong>FORMA A:</strong> Autorimessaggio/trasporto, sottrazione/smarrimento chiavi, immatricolazione, danni bagagli, trasporto vittime (massimale 500 €/sinistro per diverse voci), duplicati documenti, spese riparazione per furto totale (massimale 500 €/anno), ripristino box (massimale 5.000 €), ripristino airbag (massimale 1.500 €), sistemi antifurto (massimale 1.000 €/anno).</li>
          <li><strong>FORMA B:</strong> Spese lavaggio/disinfezione, veterinarie, sostituzione serratura abitazione, duplicato patente, danni attrezzature disabili (massimale 250 €/anno), trasporto per fermo mezzo (massimale 250 €, elevato a 300 € con disabile), danni su traghetti (massimale 3.000 €), reimmatricolazione (massimale 250 €/anno).</li>
          <li><strong>FORMA C:</strong> Include entrambe le Forme A e B.</li>
        </ul>
        <p><strong>Opzione Aggiuntiva (se indicata in polizza): "Valore Garantito"</strong> (liquidazione basata sul valore dichiarato al momento della stipula/rinnovo).</p>
      </>
    )
  },
  {
    id: 5,
    title: "Garanzia KASKO",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Indennizza danni materiali e diretti al veicolo assicurato (inclusi Attacchi Cyber) durante la circolazione, anche per colpa grave dell'assicurato.</li>
          <li><strong>Per veicoli elettrici/ibridi plug-in:</strong> Danni ai cavi di alimentazione durante la ricarica.</li>
        </ul>
        <h3>Opzioni/Livelli di Copertura:</h3>
        <ul>
          <li><strong>Kasko Collisione (o EasyKasko):</strong> Danni da collisione con altro veicolo a motore identificato e abilitato alla circolazione.</li>
          <li><strong>Kasko Totale:</strong> Danni da urto contro ostacoli (fissi o mobili, animali), ribaltamento, uscita di strada.</li>
          <li><strong>Alter Ego:</strong> Danni da collisione con altro veicolo identificato ma non assicurato per R.C.A. o immatricolato e assicurato all'estero (sistema Carta Verde).</li>
        </ul>
        <p><strong>Opzione Aggiuntiva (se indicata in polizza): "Valore Garantito"</strong> (liquidazione basata sul valore dichiarato al momento della stipula/rinnovo).</p>
      </>
    )
  },
  {
    id: 6,
    title: "Garanzia EVENTI SPECIALI",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Indennizza danni materiali e diretti al veicolo assicurato.</li>
          <li><strong>Per veicoli elettrici/ibridi plug-in:</strong> Danni ai cavi di alimentazione durante la ricarica.</li>
        </ul>
        <h3>Coperture (attivabili singolarmente o cumulativamente):</h3>
        <ul>
          <li><strong>Eventi Naturali:</strong> Danni da eventi atmosferici (es. grandine, alluvioni) e collisione con animali selvatici (massimale 4.000 €, con limite valore commerciale).</li>
          <li><strong>Atti Vandalici ed Eventi Sociopolitici:</strong> Danni da vandalismo, tumulti, scioperi, ecc. Include danni da rigatura/graffiatura (massimale 1.500 €, elevabile a valore commerciale se riparato in carrozzeria convenzionata).</li>
        </ul>
        <p><strong>Opzione Aggiuntiva (se indicata in polizza): "Valore Garantito"</strong> (liquidazione basata sul valore dichiarato al momento della stipula/rinnovo).</p>
      </>
    )
  },
  {
    id: 7,
    title: "Garanzia CRISTALLI",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Copre i danni da rottura o scheggiatura dei cristalli dell'abitacolo (parabrezza, lunotto, finestrini laterali, tetto panoramico).</li>
        </ul>
        <h3>Opzioni/Livelli di Copertura:</h3>
        <ul>
          <li><strong>FORMA A:</strong> Massimale 10% del valore assicurato (max 750 €), con franchigia 50 €. Franchigia non applicata se si usano specialisti convenzionati.</li>
          <li><strong>FORMA B:</strong> Massimale 1.900 € senza franchigia, se l'Assicurato ripristina il danno avvalendosi degli specialisti convenzionati con la Compagnia; 600 € con applicazione di una Franchigia di 100 € in caso contrario.</li>
        </ul>
      </>
    )
  },
  {
    id: 8,
    title: "Garanzia OLTRE (Guasti Meccanici)",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Indennizza i guasti a componenti meccaniche, elettriche, elettroniche, pneumatiche e idrauliche che compromettono il funzionamento del veicolo (riparazione, sostituzione, manodopera).</li>
          <li>Valida a scadenza della garanzia legale del costruttore/venditore.</li>
        </ul>
        <h3>Opzioni/Livelli di Copertura:</h3>
        <ul>
          <li>Pacchetti **Small, Medium, Large** (con diverse componenti coperte e dettagli specifici nel documento).</li>
        </ul>
      </>
    )
  },
  {
    id: 9,
    title: "Garanzia RITIRO PATENTE",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Corrisponde un'indennità giornaliera (massimo 180 giorni per sinistro) in caso di sospensione della patente per incidente stradale con esiti mortali o lesioni gravi ed in ogni altro caso di investimento di persona.</li>
        </ul>
      </>
    )
  },
  {
    id: 10,
    title: "Garanzia INFORTUNI DEL CONDUCENTE",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Indennizza le conseguenze degli infortuni subiti dal conducente del veicolo assicurato (inclusi Attacchi Cyber).</li>
        </ul>
        <h3>Coperture:</h3>
        <ul>
          <li><strong>Invalidità Permanente:</strong> Pagamento percentuale somma assicurata in base al grado di invalidità (entro 2 anni).</li>
          <li><strong>Morte o Morte Presunta:</strong> Somma assicurata agli eredi (se decesso entro 2 anni).</li>
          <li><strong>Diaria per Ricovero Ospedaliero:</strong> Indennità giornaliera (max 300 giorni/infortunio).</li>
          <li><strong>Spese di Cura:</strong> Rimborso spese sostenute fino a 300 giorni dopo l'infortunio (medici, chirurghi, medicine, ospedali, ecc.). Massimale 250 € per spese di trasporto.</li>
        </ul>
        <h3>Opzione Aggiuntiva (con premio aggiuntivo):</h3>
        <ul>
          <li><strong>Infortuni della Mobilità:</strong> Estende la copertura agli infortuni subiti come conducente di: biciclette; monopattini elettrici; veicoli non di proprietà del conducente o dei familiari; come pedone se investito da un veicolo con l'obbligo assicurativo o da un tram.</li>
        </ul>
      </>
    )
  },
  {
    id: 11,
    title: "Garanzia TUTELA LEGALE",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso) – Gestita da D.A.S. S.p.A.</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Indennizzo del Rischio dell'assistenza stragiudiziale e giudiziale nei limiti del massimale e condizioni in Polizza (inclusi Attacchi Cyber).</li>
        </ul>
        <h3>Opzioni/Livelli di Copertura:</h3>
        <ul>
          <li><strong>Forma Base B:</strong> Danno extracontrattuale da illecito di terzi, difesa in procedimenti penali (delitti colposi/contravvenzioni), ricorsi contro revoca patente per incidenti con vittime, istanze dissequestro veicolo. *Per veicoli elettrici/ibridi:* procedimenti/vertenze per danni durante ricarica, vertenze con fornitore noleggio batterie.</li>
          <li><strong>Forma Gold C:</strong> Estende Forma Base B; include ricorsi contro sanzioni per incidenti, controversie contrattuali civili (importo > 250 €), difesa in procedimenti penali per delitti dolosi (se proscioglimento/assoluzione).</li>
          <li><strong>Forma Vita Privata:</strong> Tutela per conduzione abitazione (anche uso turistico max 3 mesi), proprietà/uso animali domestici, vita privata extraprofessionale. *Per veicoli elettrici/ibridi:* estende la Forma Base includendo tutele legate all'installazione stazione ricarica, danni durante ricarica, vertenze con fornitore noleggio batterie.</li>
        </ul>
        <h3>Opzione Aggiuntiva (con premio aggiuntivo):</h3>
        <ul>
          <li><strong>Patente a punti:</strong> Rimborso corsi recupero punti (fino a 500 €), esame idoneità per perdita totale punti (fino a 1.000 €), spese ricorso per decurtazione > 5 punti.</li>
        </ul>
      </>
    )
  },
  {
    id: 12,
    title: "Garanzia ASSISTENZA",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso) – Gestita da Mapfre Asistencia S.A.</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Fornisce prestazioni di assistenza in caso di sinistro.</li>
        </ul>
        <h3>Opzioni/Livelli di Copertura (con massimali specifici per prestazione):</h3>
        <ul>
          <li><strong>Forma A:</strong> Depannage, soccorso stradale, spese di rimessaggio, recupero veicolo fuori strada, invio pezzi di ricambio. *Per sinistri in Italia:* info stazioni ricarica veicoli elettrici/ibridi. *Per sinistri all'estero:* anticipo cauzione penale/civile.</li>
          <li><strong>Forma B:</strong> Include Forma A + consulenza medica, trasferimento/rientro da centro ospedaliero, viaggio recupero veicolo, rientro passeggeri/prosecuzione viaggio, spese albergo, autista, anticipo spese prima necessità, ecc. *Specifiche per Italia/estero*.</li>
          <li><strong>Forma B Plus:</strong> Include Forma A + infermiere/fisioterapista a domicilio, collaboratrice familiare, video consulto medico, primo colloquio consulenza psicologica. *Per sinistri solo in Italia:* artigiano tuttofare, baby-sitter, pet sitter.</li>
        </ul>
      </>
    )
  },
  {
    id: 13, // Corretto l'ID rispetto alla tua numerazione precedente
    title: "Garanzia RESPONSABILITÀ CIVILE DELLA MOBILITÀ E DELLA VITA PRIVATA",
    content: () => (
      <>
        <p><strong>Tipo:</strong> Opzionale (Altro Rischio Diverso)</p>
        <h3>Caratteristiche Principali:</h3>
        <ul>
          <li>Indennizza i danni a terzi causati dal Contraente o Familiari in relazione a:
            <ul>
              <li>Conduzione dell'abitazione di residenza e relative pertinenze o altre abitazioni prese in locazione ad uso turistico (max 3 mesi).</li>
              <li>Loro vita privata, di familiari minorenni o affidati, di addetti domestici e assistenziali.</li>
            </ul>
          </li>
          <li>Estesa alla Responsabilità Civile per danni a terzi per soggetti non assicurati che abbiano ricevuto in affidamento: familiari minorenni o giuridicamente incapaci; animali domestici.</li>
        </ul>
      </>
    )
  },
  {
    id: 14, // Corretto l'ID
    title: "Limitazioni e Esclusioni Generali",
    content: () => (
      <>
        <p>È fondamentale comprendere che ogni garanzia presenta specifiche limitazioni, franchigie, scoperti ed esclusioni. Alcuni esempi generali (non esaustivi):</p>
        <h3>Limitazioni di Copertura (Esempi):</h3>
        <ul>
          <li><strong>Rivalsa Zurich:</strong> Danni da veicoli GPL in aree vietate, conducente non abilitato, trasporto non conforme, circolazione in autodromi, guida in stato di ebbrezza grave (>1,2 g/l) o sotto stupefacenti.</li>
          <li>Il conducente responsabile del sinistro non è coperto per i propri danni (persona/cose) dalla R.C.A.</li>
          <li>Familiari stretti del conducente/proprietario potrebbero essere esclusi per i danni a cose.</li>
          <li>Danni durante gare/competizioni sportive (salvo specifiche estensioni).</li>
          <li>Danni in aree aeroportuali (salvo eccezioni normative).</li>
        </ul>
        <h3>Obblighi del Contraente:</h3>
        <ul>
          <li>Fornire informazioni veritiere.</li>
          <li>Comunicare aggravamenti/diminuzioni del rischio.</li>
          <li>Comunicare esistenza di altre assicurazioni.</li>
          <li>Pagare il premio nei termini.</li>
        </ul>
      </>
    )
  },
  {
    id: 15, // Corretto l'ID
    title: "Conclusione",
    content: () => (
      <>
        <p>La polizza Zurigò Auto offre una copertura R.C. Auto completa e la possibilità di aggiungere numerose garanzie opzionali per una protezione su misura.</p>
        <p><strong>Per dettagli specifici, massimali, franchigie, scoperti ed esclusioni, è fondamentale consultare integralmente il Set Informativo e le Condizioni di Assicurazione.</strong></p>
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Rivolgiti al tuo intermediario Zurich per una consulenza personalizzata.
        </p>
      </>
    )
  }
];