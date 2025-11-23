#!/usr/bin/env python3
"""
validar_completo.py
-------------------
Script integrado que executa todo o fluxo de validação:
1. Converte JSON do questionário para CSV
2. Executa o validador de conformidade
3. Gera o relatório final

Uso:
    python scripts/validar_completo.py
    
    ou
    
    python scripts/validar_completo.py data/respostas_questionario-2025-11-20.json
"""

import sys
import subprocess
from pathlib import Path

# Adiciona o diretório de scripts ao path
BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BASE_DIR / "scripts"))
sys.path.insert(0, str(BASE_DIR / "tools" / "validacao"))

from json_para_csv import converter_json_para_csv


def validar_completo(caminho_json: Path = None):
    """
    Executa o fluxo completo de validação.
    """
    print("=" * 70)
    print("🏠 VALIDAÇÃO COMPLETA DO PROJETO - ProjetoCasa")
    print("=" * 70)
    print()
    
    # Define o arquivo JSON padrão se não fornecido
    if caminho_json is None:
        caminho_json = BASE_DIR / "data" / "respostas_questionario.json"
        
        # Tenta usar o arquivo mais recente se houver
        data_dir = BASE_DIR / "data"
        arquivos_json = list(data_dir.glob("respostas_questionario*.json"))
        if arquivos_json:
            # Ordena por data de modificação (mais recente primeiro)
            caminho_json = max(arquivos_json, key=lambda p: p.stat().st_mtime)
    
    if not caminho_json.exists():
        print(f"❌ Erro: Arquivo JSON não encontrado: {caminho_json}")
        print()
        print("💡 Dica: Preencha o questionário em docs/sistema/questionario.html")
        print("   e exporte o arquivo JSON para a pasta data/")
        return False
    
    print(f"📂 Arquivo de entrada: {caminho_json.name}")
    print()
    
    # Passo 1: Converter JSON para CSV
    print("🔄 PASSO 1: Convertendo JSON para CSV...")
    print("-" * 70)
    try:
        caminho_csv = converter_json_para_csv(caminho_json)
        print()
    except Exception as e:
        print(f"❌ Erro na conversão: {e}")
        return False
    
    # Passo 2: Executar validador de conformidade
    print("🔍 PASSO 2: Validando conformidade com as normas...")
    print("-" * 70)
    
    validador_path = BASE_DIR / "tools" / "validacao" / "validador_conformidade.py"
    
    try:
        resultado = subprocess.run(
            [sys.executable, str(validador_path), str(caminho_csv)],
            capture_output=True,
            text=True,
            cwd=str(BASE_DIR)
        )
        
        if resultado.returncode == 0:
            print("✅ Validação executada com sucesso!")
        else:
            print(f"⚠️  Validação concluída com avisos:")
            if resultado.stderr:
                print(resultado.stderr)
        
        print()
    except Exception as e:
        print(f"❌ Erro ao executar validador: {e}")
        return False
    
    # Passo 3: Verificar relatório gerado
    print("📄 PASSO 3: Verificando relatório gerado...")
    print("-" * 70)
    
    relatorio_path = BASE_DIR / "docs" / "normas" / "relatorio_conformidade.md"
    
    if relatorio_path.exists():
        print(f"✅ Relatório gerado: {relatorio_path.relative_to(BASE_DIR)}")
        print()
        
        # Mostra um preview do resultado
        with relatorio_path.open('r', encoding='utf-8') as f:
            conteudo = f.read()
            
            # Procura pela seção de resultado geral
            if "✅ **Projeto atende a todos os requisitos" in conteudo:
                print("🎉 RESULTADO: Projeto CONFORME com todas as normas!")
            elif "❌ **Projeto apresenta itens que precisam ser ajustados" in conteudo:
                print("⚠️  RESULTADO: Projeto apresenta NÃO-CONFORMIDADES.")
                print("    Consulte o relatório para detalhes.")
            
            print()
    else:
        print("❌ Relatório não foi gerado.")
        return False
    
    # Conclusão
    print("=" * 70)
    print("✅ VALIDAÇÃO COMPLETA CONCLUÍDA!")
    print("=" * 70)
    print()
    print(f"📊 Próximos passos:")
    print(f"   1. Abra o relatório: {relatorio_path.relative_to(BASE_DIR)}")
    print(f"   2. Revise os itens de conformidade")
    print(f"   3. Ajuste o projeto se necessário")
    print(f"   4. Execute novamente este script após ajustes")
    print()
    
    return True


def main():
    caminho_json = None
    
    if len(sys.argv) > 1:
        caminho_json = Path(sys.argv[1])
    
    sucesso = validar_completo(caminho_json)
    sys.exit(0 if sucesso else 1)


if __name__ == "__main__":
    main()
