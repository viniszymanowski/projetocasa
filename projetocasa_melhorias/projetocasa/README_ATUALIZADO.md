# ProjetoCasa

Sistema completo de documentação, validação e gestão de projeto residencial.

## 🏠 Sobre o Projeto

O **ProjetoCasa** é uma solução inovadora que aplica metodologias de desenvolvimento de software à gestão de projetos de arquitetura e construção civil. Utilizando documentação como código (Docs-as-Code), controle de versão e automação, o sistema centraliza todas as informações do projeto em um único repositório.

## ✨ Funcionalidades Principais

### 📋 Documentação Estruturada
- **Persona e Requisitos:** Perfil dos moradores e suas necessidades
- **Terreno:** Dimensões, restrições e características físicas
- **Arquitetura:** Conceito, programa de necessidades e partido arquitetônico
- **Decisões:** Registro de todas as escolhas de projeto
- **Normas:** Código de obras e requisitos legais

### 🔍 Validação Automática
- **Validador de Conformidade:** Verifica automaticamente se o projeto atende às normas técnicas
- **Relatórios Automatizados:** Gera relatórios em Markdown com status de conformidade
- **Integração Completa:** Fluxo integrado do questionário até a validação

### 🖥️ Painel Web Interativo
- **Dashboard Central:** Interface amigável para navegar pela documentação
- **Questionário de Dados:** Coleta estruturada de informações do terreno
- **Galeria de Fotos:** Visualização organizada de imagens do projeto

### 🤖 Scripts de Automação
- **Organização de Fotos:** Automatiza a organização e catalogação de imagens
- **Geração de Relatórios:** Cria relatórios completos em PDF
- **Conversão de Dados:** Integra diferentes formatos (JSON ↔ CSV)

## 🚀 Como Usar

### 1. Preencher o Questionário
Acesse `docs/sistema/questionario.html` no navegador e preencha as informações do terreno. Exporte o arquivo JSON para a pasta `data/`.

### 2. Validar o Projeto
Execute o script de validação completa:

```bash
python scripts/validar_completo.py
```

Este comando irá:
- Converter os dados do questionário (JSON) para o formato de validação (CSV)
- Executar a validação de conformidade com as normas
- Gerar o relatório em `docs/normas/relatorio_conformidade.md`

### 3. Organizar Fotos
Para organizar fotos do terreno:

```bash
python scripts/organizar_fotos.py
```

Para organizar imagens de referência:

```bash
python scripts/organizar_referencias.py
```

### 4. Gerar Relatório Completo
Para criar um relatório consolidado em PDF:

```bash
python scripts/gerar_relatorio_pdf.py
```

## 📁 Estrutura do Repositório

```
projetocasa/
├── docs/                      # Documentação principal
│   ├── arquitetura/          # Conceito, programa de necessidades
│   ├── decisoes/             # Registro de decisões
│   ├── normas/               # Código de obras e conformidade
│   ├── persona/              # Perfil dos moradores
│   ├── sistema/              # Painel web e questionário
│   └── terreno/              # Informações do lote
├── data/                      # Dados brutos (JSON, fotos)
├── fotos/                     # Imagens organizadas
├── plantas/                   # Desenhos técnicos
├── scripts/                   # Scripts de automação
│   ├── validar_completo.py   # Validação integrada
│   ├── json_para_csv.py      # Conversor de dados
│   ├── organizar_fotos.py    # Organizador de fotos
│   ├── organizar_referencias.py
│   └── gerar_relatorio_pdf.py
└── tools/                     # Ferramentas auxiliares
    └── validacao/            # Validador de conformidade
```

## 🌐 Acesso ao Painel Web

### Localmente
Abra o arquivo `docs/sistema/index.html` diretamente no navegador.

### Online (GitHub Pages)
Após configurar o GitHub Pages nas configurações do repositório, o painel estará disponível em:
```
https://[seu-usuario].github.io/projetocasa/
```

## 🛠️ Requisitos

- **Python 3.7+** para executar os scripts
- Navegador web moderno para acessar o painel
- Git para controle de versão

### Bibliotecas Python
Todas as bibliotecas necessárias são nativas do Python (csv, json, pathlib, shutil). Não há dependências externas.

## 📊 Fluxo de Trabalho Recomendado

1. **Definir Persona** → Preencher `docs/persona/persona.md`
2. **Coletar Dados do Terreno** → Usar questionário web
3. **Validar Conformidade** → Executar `validar_completo.py`
4. **Desenvolver Conceito** → Documentar em `docs/arquitetura/`
5. **Registrar Decisões** → Atualizar `docs/decisoes/`
6. **Organizar Mídia** → Usar scripts de organização
7. **Gerar Relatórios** → Criar PDFs para apresentação

## 🎯 Próximas Melhorias

- [ ] CI/CD com validação automática em commits
- [ ] Dashboard com métricas e gráficos de progresso
- [ ] Sistema de comentários e anotações
- [ ] Integração com ferramentas de orçamento
- [ ] Geração automática de cronograma

## 📝 Licença

Este projeto é de uso pessoal. Sinta-se livre para adaptar à sua necessidade.

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões e melhorias são bem-vindas através de issues e pull requests.

---

**Desenvolvido com ❤️ para facilitar a gestão de projetos residenciais**
