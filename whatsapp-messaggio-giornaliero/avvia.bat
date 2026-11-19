@echo off
title WhatsApp - messaggio giornaliero
cd /d "%~dp0"

call :prepara
if errorlevel 1 goto fine

:ciclo
node index.js
rem Codice 2 = impostazioni da correggere: inutile riavviare.
if errorlevel 2 goto fine
echo.
echo Il programma si e' fermato: riparte da solo tra 30 secondi.
echo Per fermarlo del tutto chiudi questa finestra.
timeout /t 30 /nobreak >nul
goto ciclo

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
