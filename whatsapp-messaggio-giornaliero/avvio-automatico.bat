@echo off
title Avvio automatico - messaggio WhatsApp giornaliero
cd /d "%~dp0"

rem Crea un collegamento ad avvia.bat nella cartella Esecuzione automatica
rem di Windows: il programma parte da solo, ridotto a icona, a ogni accesso.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$percorso = Join-Path ([Environment]::GetFolderPath('Startup')) 'WhatsApp messaggio giornaliero.lnk'; $c = (New-Object -ComObject WScript.Shell).CreateShortcut($percorso); $c.TargetPath = '%~dp0avvia.bat'; $c.WorkingDirectory = '%~dp0'; $c.WindowStyle = 7; $c.Save()"
if errorlevel 1 (
  echo.
  echo Non sono riuscito ad attivare l'avvio automatico.
) else (
  echo.
  echo Fatto: il programma partira' da solo ogni volta che accedi a Windows.
  echo Per toglierlo: premi Windows+R, scrivi shell:startup, premi Invio
  echo e cancella "WhatsApp messaggio giornaliero".
)
echo.
pause
