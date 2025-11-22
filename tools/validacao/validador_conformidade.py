"""
validador_conformidade.py
--------------------------------
Script para verificar se um projeto residencial atende aos parâmetros básicos
definidos no checklist de conformidade (docs/normas/checklist_conformidade.md).

Uso básico (no terminal):
    python validador_conformidade.py exemplo_dados_projeto.csv

O script gera SEMPRE um arquivo
    docs/normas/relatorio_conformidade.md
no diretório raiz do repositório.
"""

import csv
import sys
from pathlib import Path

# Limites de referência (ajuste conforme as normas locais)
LIMITE_PE_DIREITO = 2.60
LIMITE_RECUO_FRONTAL = 5.00
LIMITE_RECUO_LATERAL = 1.50
LIMITE_RECUO_FUNDOS = 2.00
LIMITE_TAXA_OCUPACAO = 70.0  # em %
LIMITE_ALTURA_TOTAL = 6.00
LIMITE_AREA_VENTILACAO_REL = 1.0 / 8.0  # razão área ventilação / área piso


def ler_dados_arquivo(caminho_csv: Path) -> dict:
    with caminho_csv.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        dados = list(reader)
    if not dados:
        raise ValueError("Arquivo CSV vazio.")
    # Usamos apenas a primeira linha como resumo geral do projeto
    return dados[0]


def checar_conformidade(dados: dict):
    # Converte campos numéricos; se faltar algum, lança erro amigável
    def num(campo, padrao=None):
        valor = dados.get(campo)
        if valor is None or valor == "":
            if padrao is not None:
                return padrao
            raise ValueError(f"Campo obrigatório ausente no CSV: {campo}")
        return float(str(valor).replace(",", "."))

    resultado = {}

    resultado["pe_direito"] = num("pe_direito")
    resultado["recuo_frontal"] = num("recuo_frontal")
    resultado["recuo_lateral"] = num("recuo_lateral")
    resultado["recuo_fundos"] = num("recuo_fundos")
    resultado["taxa_ocupacao"] = num("taxa_ocupacao")
    resultado["altura_total"] = num("altura_total")
    resultado["area_piso_total"] = num("area_piso_total")
    resultado["area_ventilacao_total"] = num("area_ventilacao_total")
    resultado["area_vent_rel"] = (
        resultado["area_ventilacao_total"] / resultado["area_piso_total"]
    )
    resultado["acessibilidade_ok"] = (
        str(dados.get("acessibilidade_ok", "")).strip().lower()
        in ("sim", "true", "1")
    )

    # Avaliação booleana de cada item
    checks = {
        "Pé-direito mínimo": resultado["pe_direito"] >= LIMITE_PE_DIREITO,
        "Recuo frontal": resultado["recuo_frontal"] >= LIMITE_RECUO_FRONTAL,
        "Recuo lateral": resultado["recuo_lateral"] >= LIMITE_RECUO_LATERAL,
        "Recuo fundos": resultado["recuo_fundos"] >= LIMITE_RECUO_FUNDOS,
        "Taxa de ocupação": resultado["taxa_ocupacao"] <= LIMITE_TAXA_OCUPACAO,
        "Altura total": resultado["altura_total"] <= LIMITE_ALTURA_TOTAL,
        "Área de ventilação": resultado["area_vent_rel"] >= LIMITE_AREA_VENTILACAO_REL,
        "Acessibilidade (NBR 9050)": resultado["acessibilidade_ok"],
    }

    return resultado, checks


def gerar_relatorio(dados: dict, checks: dict, caminho_saida: Path) -> Path:
    def marca(ok):
        return "✅" if ok else "❌"

    linhas = []
    linhas.append("# Relatório de Conformidade do Projeto\n")
    linhas.append(
        "Este relatório foi gerado automaticamente com base nos dados fornecidos em CSV.\n"
    )
    linhas.append("## Resumo dos parâmetros informados\n")
    linhas.append(f"- Pé-direito: **{dados['pe_direito']:.2f} m**")
    linhas.append(f"- Recuo frontal: **{dados['recuo_frontal']:.2f} m**")
    linhas.append(f"- Recuo lateral: **{dados['recuo_lateral']:.2f} m**")
    linhas.append(f"- Recuo fundos: **{dados['recuo_fundos']:.2f} m**")
    linhas.append(f"- Taxa de ocupação: **{dados['taxa_ocupacao']:.2f} %**")
    linhas.append(f"- Altura total: **{dados['altura_total']:.2f} m**")
    linhas.append(f"- Área de piso total: **{dados['area_piso_total']:.2f} m²**")
    linhas.append(
        f"- Área de ventilação total: **{dados['area_ventilacao_total']:.2f} m²**"
    )
    linhas.append(
        f"- Relação área de ventilação / área de piso: **{dados['area_vent_rel']:.3f}**"
    )
    linhas.append(
        f"- Acessibilidade conforme NBR 9050: **{'Sim' if dados['acessibilidade_ok'] else 'Não'}**\n"
    )

    linhas.append("## Checklist\n")
    linhas.append("| Item | Situação |")
    linhas.append("|------|----------|")
    for nome, ok in checks.items():
        linhas.append(f"| {nome} | {marca(ok)} |")

    linhas.append("\n## Resultado geral\n")
    if all(checks.values()):
        linhas.append(
            "✅ **Projeto atende a todos os requisitos mínimos de conformidade.**"
        )
    else:
        linhas.append(
            "❌ **Projeto apresenta itens que precisam ser ajustados. Consulte o checklist acima.**"
        )

    caminho_saida.parent.mkdir(parents=True, exist_ok=True)
    caminho_saida.write_text("\n".join(linhas), encoding="utf-8")
    return caminho_saida


def main():
    if len(sys.argv) < 2:
        print("Uso: python validador_conformidade.py caminho_para_dados.csv")
        sys.exit(1)

    caminho_csv = Path(sys.argv[1])
    if not caminho_csv.exists():
        p
