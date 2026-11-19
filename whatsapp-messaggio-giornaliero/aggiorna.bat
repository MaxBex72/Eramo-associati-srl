@echo off
title Aggiornamento - messaggio WhatsApp giornaliero
cd /d "%~dp0"

echo Prima di continuare chiudi la finestra del programma, se e' aperta.
echo.
pause

echo.
echo Aggiorno i componenti, attendi...
echo.
if exist ".wwebjs_cache" rmdir /s /q ".wwebjs_cache"
call npm install whatsapp-web.js@latest qrcode@latest --no-fund --no-audit
if errorlevel 1 (
  echo.
  echo Aggiornamento non riuscito. Controlla la connessione a internet e riprova.
) else (
  echo.
  echo Aggiornamento completato. Ora riavvia il programma con avvia.bat.
)
echo.
pause
