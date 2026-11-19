@echo off
title Prova - messaggio WhatsApp giornaliero
cd /d "%~dp0"

call :prepara
if errorlevel 1 goto fine

rem Invia il messaggio solo a te stesso: il gruppo non riceve niente.
node index.js --prova

:fine
echo.
pause
exit /b

rem ------------------------------------------------------------------
rem Controlla Node.js e installa i componenti alla prima esecuzione.
rem ------------------------------------------------------------------
:prepara
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js non e' installato.
  echo Scaricalo da https://nodejs.org - versione LTS - installalo e riprova.
  exit /b 1
)
if exist "node_modules\whatsapp-web.js\package.json" exit /b 0
echo.
echo Prima esecuzione: installo i componenti necessari.
echo Puo' richiedere qualche minuto, attendi...
echo.
call npm install --no-fund --no-audit
if errorlevel 1 (
  echo.
  echo Installazione non riuscita. Controlla la connessione a internet e riprova.
  exit /b 1
)
exit /b 0
