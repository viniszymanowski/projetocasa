# ProjetoCasa

Sistema de documentação e validação do projeto residencial.

## Módulos principais

1. **Normas & Validação**
   - `docs/normas/codigo_de_obras.md`
   - `docs/normas/resumo_normas_local.md`
   - `docs/normas/checklist_conformidade.md`
   - `docs/normas/relatorio_conformidade.md` (gerado automaticamente)
   - `tools/validacao/validador_conformidade.py`
   - `tools/validacao/exemplo_dados_projeto.csv`
   - `tools/validacao/validar_projeto.bat`

2. **Arquitetura**
   - `docs/arquitetura/conceito_inicial.md`
   - `docs/arquitetura/versao_pre_executivo.md`
   - `docs/arquitetura/versao_executivo.md`
   - `docs/arquitetura/revisoes.md`
   - `docs/arquitetura/checklist_ambientes.md`
   - Subpastas sugeridas: `moodboard/` e `referencias/` para imagens e inspirações.

3. **Terreno**
   - `docs/terreno/ficha_terreno.md`
   - `docs/terreno/estudos_implantacao.md`

4. **Decisões de projeto**
   - `docs/decisoes/linha_do_tempo.md`

5. **Persona & uso da casa**
   - `docs/persona/rotina_casal.md`
   - `docs/persona/requisitos_funcionais.md`

6. **Sistema & Dashboard (futuro)**
   - `docs/sistema/dashboard_resumo.md`
   - `docs/sistema/automacoes.md`

---

## Como rodar a validação automática

**Opção 1 – Clique duplo**
1. Acesse `tools/validacao/`.
2. Clique duas vezes em `validar_projeto.bat`.
3. O relatório será gerado em `docs/normas/relatorio_conformidade.md`.

**Opção 2 – Terminal**
```bash
cd tools/validacao
py validador_conformidade.py exemplo_dados_projeto.csv
```

Depois, abra `docs/normas/relatorio_conformidade.md` para ver o resultado (✅ / ❌) por item.
