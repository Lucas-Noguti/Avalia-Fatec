@echo off
echo ========================================
echo   Liberando porta 8080
echo ========================================
echo.

echo Procurando processos na porta 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do (
    echo Matando processo %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo Porta 8080 liberada!
echo Agora voce pode iniciar o backend.
echo.
pause
