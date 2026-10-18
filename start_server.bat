@echo off
chcp 65001 >nul
title HOFFEN 1 - Elektron Katalog Serveri (Parol: 196164)
cls

echo ==============================================================================
echo   🚀 HOFFEN 1 - RASMIY ELEKTRON KATALOG VA SERVER BOSHQARUV TIZIMI
echo ==============================================================================
echo.
echo   * Oddiy tashrif buyuruvchilar katalogdagi narxlarni o'zgartira olmaydi.
echo   * Narxlar faqat serverdan, maxsus parol orqali o'zgartiriladi.
echo.
echo   🔑 ADMIN MAXSUS PAROLI:  196164
echo   🌐 MIJOZLAR UCHUN:        http://localhost:8080/
echo   🔐 ADMIN BOSHQARUVI:      http://localhost:8080/admin.html
echo.
echo ==============================================================================
echo.
echo [1/2] Server ishga tushirilmoqda (Python 3)...

:: Check Python Executable
set "PYTHON_EXE="
if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
) else if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
) else (
    where py >nul 2>&1 && set "PYTHON_EXE=py" || (
        where python >nul 2>&1 && set "PYTHON_EXE=python"
    )
)

if "%PYTHON_EXE%"=="" (
    echo [XATOLIK] Tizimda Python 3 topilmadi! Iltimos, Python o'rnatilganligini tekshiring.
    pause
    exit /b 1
)

:: Open browser automatically after 1.5 seconds
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8080/"

echo [2/2] Brauzerda http://localhost:8080 ochilmoqda...
echo.
echo Server ishlab turibdi. Uni to'xtatish uchun ushbu oynani yoping yoki Ctrl+C bosing.
echo ------------------------------------------------------------------------------

"%PYTHON_EXE%" server.py
pause
