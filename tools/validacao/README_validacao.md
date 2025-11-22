# Ferramenta de Validação de Conformidade

Este diretório contém um script simples em Python para validar se um projeto residencial
atende aos parâmetros básicos do checklist de conformidade definido em `docs/normas/checklist_conformidade.md`.

## Arquivos

- `validador_conformidade.py` – script principal de validação.
- `exemplo_dados_projeto.csv` – exemplo de arquivo de entrada com os campos necessários.

## Campos esperados no CSV

- `pe_direito` – pé-direito médio do projeto (m).
- `recuo_frontal` – recuo frontal (m).
- `recuo_lateral` – recuo lateral (m).
- `recuo_fundos` – recuo nos fundos (m).
- `taxa_ocupacao` – taxa de ocupação do lote (%).
- `altura_total` – altura total da edificação (m).
- `area_piso_total` – área total de piso considerada (m²).
- `area_ventilacao_total` – área total de aberturas para ventilação (m²).
- `acessibilidade_ok` – `sim` ou `não` indicando se atende à NBR 9050.

## Uso

1. Copie este diretório para dentro do seu projeto (por exemplo, em `tools/validacao/`).
2. Crie um arquivo CSV com os dados do projeto seguindo o modelo `exemplo_dados_projeto.csv`.
3. No terminal, execute:

```bash
python validador_conformidade.py exemplo_dados_projeto.csv
```

Será gerado um arquivo `relatorio_conformidade.md` no mesmo diretório, com o resumo da análise.
