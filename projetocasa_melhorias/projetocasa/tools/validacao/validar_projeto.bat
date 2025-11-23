@echo off
REM ===============================================================
REM Validador de Conformidade - ProjetoCasa
REM ---------------------------------------------------------------
REM Este script automatiza a execução do validador_conformidade.py
REM Gerando automaticamente o relatório em docs\normas.
REM ===============================================================

cd /d "%~dp0"
cd ..
cd ..

echo Executando verificação de conformidade...
py tools\validacao\validador_conformidade.py tools\validacao\exemplo_dados_projeto.csv

echo.
echo =============================================
echo Validação concluída!
echo O relatório foi gerado em:
echo docs\normas\relatorio_conformidade.md
echo =============================================
pause
