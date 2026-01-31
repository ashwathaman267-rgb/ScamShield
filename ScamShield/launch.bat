@echo off
echo Starting ScamShield Server...
echo Opening http://localhost:3000
start http://localhost:3000
powershell -ExecutionPolicy Bypass -File server.ps1
pause
