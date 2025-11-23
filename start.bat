@echo off
echo ========================================
echo   Iniciando Avalia FATEC
echo ========================================
echo.

echo [1/4] Verificando MySQL...
echo Certifique-se que o MySQL esta rodando no XAMPP!
echo.
pause

echo [2/4] Liberando porta 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do (
    echo Matando processo na porta 8080: %%a
    taskkill /F /PID %%a 2>nul
)
echo Porta 8080 liberada!
echo.

echo [3/4] Iniciando Backend...
start "Backend - Spring Boot" cmd /k "cd backend && mvnw.cmd spring-boot:run"
echo Aguarde o backend iniciar (cerca de 30 segundos)...
timeout /t 35 /nobreak
echo.

echo [4/4] Iniciando Frontend...
start "Frontend - React" cmd /k "cd frontend && npm run dev"
echo.

echo ========================================
echo   Tudo pronto!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Pressione qualquer tecla para abrir o navegador...
pause
start http://localhost:5173
