#!/usr/bin/env python3
"""
json_para_csv.py
-----------------
Converte os dados exportados do questionário (JSON) para o formato CSV
esperado pelo validador de conformidade.

Uso:
    python scripts/json_para_csv.py data/respostas_questionario.json
"""

import json
import csv
import sys
from pathlib import Path


def extrair_numero(texto: str) -> float:
    """
    Extrai o primeiro número encontrado em uma string.
    Ex: "frontal 5 m, laterais 1,5 m" -> 5.0
    """
    import re
    if not texto:
        return 0.0
    
    # Remove espaços e substitui vírgulas por pontos
    texto = texto.replace(",", ".")
    
    # Procura por números (inteiros ou decimais)
    match = re.search(r'\d+\.?\d*', texto)
    if match:
        return float(match.group())
    return 0.0


def extrair_recuos(texto_recuos: str) -> dict:
    """
    Extrai recuos frontal, lateral e fundos de um texto descritivo.
    Ex: "frontal 5 m, laterais 1,5 m, fundos 2 m"
    """
    recuos = {
        'frontal': 0.0,
        'lateral': 0.0,
        'fundos': 0.0
    }
    
    if not texto_recuos:
        return recuos
    
    texto_lower = texto_recuos.lower()
    
    # Procura por padrões como "frontal 5", "lateral 1.5", etc.
    import re
    
    # Frontal
    match_frontal = re.search(r'frontal[:\s]+(\d+[.,]?\d*)', texto_lower)
    if match_frontal:
        recuos['frontal'] = float(match_frontal.group(1).replace(',', '.'))
    
    # Lateral
    match_lateral = re.search(r'lateral[:\s]+(\d+[.,]?\d*)', texto_lower)
    if match_lateral:
        recuos['lateral'] = float(match_lateral.group(1).replace(',', '.'))
    
    # Fundos
    match_fundos = re.search(r'fundos[:\s]+(\d+[.,]?\d*)', texto_lower)
    if match_fundos:
        recuos['fundos'] = float(match_fundos.group(1).replace(',', '.'))
    
    return recuos


def extrair_taxa_ocupacao(texto: str) -> float:
    """
    Extrai a taxa de ocupação de um texto.
    Ex: "60% de ocupação" -> 60.0
    """
    import re
    if not texto:
        return 0.0
    
    match = re.search(r'(\d+[.,]?\d*)\s*%', texto)
    if match:
        return float(match.group(1).replace(',', '.'))
    
    return extrair_numero(texto)


def calcular_area_ventilacao(area_piso: float) -> float:
    """
    Calcula área de ventilação mínima (1/8 da área de piso).
    """
    return area_piso / 8.0


def converter_json_para_csv(caminho_json: Path, caminho_csv: Path = None):
    """
    Converte o JSON do questionário para CSV de validação.
    """
    if not caminho_json.exists():
        print(f"❌ Arquivo não encontrado: {caminho_json}")
        sys.exit(1)
    
    # Lê o JSON
    with caminho_json.open('r', encoding='utf-8') as f:
        dados_json = json.load(f)
    
    # Extrai as respostas
    respostas = dados_json.get('respostas', {})
    
    # Extrai informações dos campos do questionário
    recuos = extrair_recuos(respostas.get('terreno_recuos', ''))
    taxa_ocupacao = extrair_taxa_ocupacao(respostas.get('terreno_taxa_ocupacao', ''))
    
    # Valores padrão (ajustar conforme necessário)
    pe_direito = 2.70  # Valor padrão comum
    altura_total = 5.80  # Valor padrão para casa térrea/sobrado
    area_piso_total = 120.0  # Estimativa inicial
    area_ventilacao_total = calcular_area_ventilacao(area_piso_total)
    acessibilidade_ok = "sim"  # Assumir conformidade inicial
    
    # Monta o dicionário de dados para CSV
    dados_csv = {
        'pe_direito': pe_direito,
        'recuo_frontal': recuos['frontal'],
        'recuo_lateral': recuos['lateral'],
        'recuo_fundos': recuos['fundos'],
        'taxa_ocupacao': taxa_ocupacao,
        'altura_total': altura_total,
        'area_piso_total': area_piso_total,
        'area_ventilacao_total': area_ventilacao_total,
        'acessibilidade_ok': acessibilidade_ok
    }
    
    # Define o caminho de saída
    if caminho_csv is None:
        caminho_csv = caminho_json.parent / 'dados_projeto_validacao.csv'
    
    # Escreve o CSV
    with caminho_csv.open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=dados_csv.keys())
        writer.writeheader()
        writer.writerow(dados_csv)
    
    print(f"✅ Conversão concluída!")
    print(f"📄 Arquivo gerado: {caminho_csv}")
    print(f"\n📊 Dados extraídos:")
    print(f"   - Recuo frontal: {recuos['frontal']:.2f} m")
    print(f"   - Recuo lateral: {recuos['lateral']:.2f} m")
    print(f"   - Recuo fundos: {recuos['fundos']:.2f} m")
    print(f"   - Taxa de ocupação: {taxa_ocupacao:.2f}%")
    print(f"\n⚠️  Nota: Valores de pé-direito, altura total e áreas foram")
    print(f"   definidos com valores padrão. Ajuste manualmente se necessário.")
    
    return caminho_csv


def main():
    if len(sys.argv) < 2:
        print("Uso: python scripts/json_para_csv.py <caminho_para_json>")
        print("Exemplo: python scripts/json_para_csv.py data/respostas_questionario.json")
        sys.exit(1)
    
    caminho_json = Path(sys.argv[1])
    converter_json_para_csv(caminho_json)


if __name__ == "__main__":
    main()
