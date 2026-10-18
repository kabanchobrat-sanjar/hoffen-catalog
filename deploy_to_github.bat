@echo off
chcp 65001 >nul
title HOFFEN 1 — GitHub-ga Yuklash va Saytni Globalga Chiqarish
color 0b

echo ======================================================================
echo           HOFFEN 1 — GITHUB VA GLOBAL SAYT OPERATSIYASI
echo ======================================================================
echo.
echo 1. GitHub (https://github.com) hisobingizga kiring.
echo 2. "New repository" tugmasini bosing.
echo 3. Repository name: hoffen-catalog (yoki xohlagan nomingiz).
echo 4. "Public" qilib oching (GitHub Pages ishlashi uchun).
echo 5. Yaratilgan repozitoriy havolasini (masalan: https://github.com/.../hoffen-catalog.git) oling.
echo.
echo ======================================================================
set /p REPO_URL="GitHub repozitoriy havolasini kiriting (Paste qiling): "

if "%REPO_URL%"=="" (
    echo.
    echo [XATOLIK] Havola kiritilmadi! Operatsiya bekor qilindi.
    pause
    exit /b
)

echo.
echo [1/3] Git masofaviy manzil sozlanmoqda...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Brench 'main' ga o'rnatilmoqda...
git branch -M main

echo [3/3] GitHub-ga barcha fayllar va katalog yuklanmoqda (Push)...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo   TABRIKLAYMIZ! LOYIHA GITHUB-GA MUVAFFAQIYATLI YUKLANDI!
    echo ======================================================================
    echo.
    echo Endi saytingiz internetda (globalda) chiqishi uchun:
    echo 1. GitHub repozitoriyingizga kiring: %REPO_URL%
    echo 2. "Settings" bo'limiga o'ting.
    echo 3. Chap menyudan "Pages" ni tanlang.
    echo 4. "Branch" joyiga "main" va "/ (root)" ni tanlab, "Save" bosing.
    echo.
    echo 1-2 daqiqada global sayt havolasi tayyor bo'ladi!
) else (
    echo.
    echo [DIQQAT] Yuklashda xatolik yuz berdi. GitHub hisobingizga ruxsatni tekshiring.
)

echo.
pause
