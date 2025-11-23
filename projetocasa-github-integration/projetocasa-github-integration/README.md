# ProjetoCasa - Sistema Interativo de Gestão

Sistema completo e interativo para gestão de projeto residencial, combinando documentação estruturada com interface web moderna.

## 🎯 Visão Geral

Este repositório contém toda a documentação e ferramentas para o projeto de construção residencial de 301 m², incluindo:

- **Sistema Web Interativo** - Dashboard moderno com navegação fluida
- **Documentação Estruturada** - Markdown para todas as decisões do projeto
- **Scripts de Automação** - Validação de conformidade e organização de arquivos
- **Ferramentas de Validação** - Checklist automático baseado no código de obras

## 🌐 Acesso ao Sistema

**Site Interativo:** [https://viniszymanowski.github.io/projetocasa/app/](https://viniszymanowski.github.io/projetocasa/app/)

O sistema web oferece:
- 📊 Dashboard com métricas e progresso do projeto
- 📝 Questionário interativo multi-etapas
- ✅ Checklist de conformidade com validação automática
- 🖼️ Galeria de fotos organizada por categorias
- 📐 Visualização de dados do terreno
- 🏛️ Programa de necessidades arquitetônico
- 👥 Perfil de persona dos moradores

## 📁 Estrutura do Projeto

```
projetocasa/
├── docs/
│   ├── app/                    # Site interativo (build de produção)
│   ├── sistema/                # Redirecionamento para o app
│   ├── sistema-antigo/         # Painel original (backup)
│   ├── arquitetura/            # Documentos de arquitetura
│   ├── persona/                # Perfil dos moradores
│   ├── terreno/                # Dados do lote
│   ├── normas/                 # Código de obras e conformidade
│   └── decisoes/               # Registro de decisões
├── scripts/                    # Scripts Python de automação
│   ├── validar_completo.py     # Validação integrada
│   ├── json_para_csv.py        # Conversor de dados
│   ├── gerar_relatorio_pdf.py  # Gerador de relatórios
│   ├── organizar_fotos.py      # Organizador de imagens
│   └── organizar_referencias.py
├── tools/                      # Ferramentas de validação
│   └── validacao/
│       ├── validador_conformidade.py
│       └── exemplo_dados_projeto.csv
└── data/                       # Dados do projeto
    └── respostas_questionario.json
```

## 🚀 Como Usar

### Acessar o Sistema Web

1. Acesse o site publicado no GitHub Pages
2. Navegue pelas diferentes seções usando o menu lateral
3. Preencha o questionário para coletar dados do projeto
4. Visualize o checklist de conformidade automaticamente

### Executar Scripts Localmente

#### Validação de Conformidade

```bash
# Validação completa (converte JSON → CSV → valida)
python scripts/validar_completo.py

# Validação direta com CSV
python tools/validacao/validador_conformidade.py
```

#### Gerar Relatório PDF

```bash
python scripts/gerar_relatorio_pdf.py
```

#### Organizar Fotos

```bash
python scripts/organizar_fotos.py
```

## 📋 Funcionalidades

### Sistema Web Interativo

- ✅ Dashboard com métricas em tempo real
- ✅ Navegação responsiva (desktop e mobile)
- ✅ Questionário multi-etapas
- ✅ Checklist de conformidade interativo
- ✅ Galeria de fotos categorizada
- ✅ Visualização de normas e código de obras
- ✅ Cards de ações rápidas
- ✅ Timeline de atividades

### Scripts de Automação

- ✅ Validação automática de conformidade
- ✅ Conversão de dados JSON para CSV
- ✅ Geração de relatórios em PDF
- ✅ Organização automática de fotos
- ✅ Organização de referências visuais

### Documentação

- ✅ Markdown estruturado para todas as seções
- ✅ Templates completos para preenchimento
- ✅ Versionamento via Git
- ✅ Fácil manutenção e atualização

## 🛠️ Tecnologias Utilizadas

### Frontend (Sistema Web)
- React 19
- TypeScript
- Tailwind CSS 4
- Wouter (roteamento)
- shadcn/ui (componentes)
- Vite (build)

### Backend/Scripts
- Python 3.x
- Pandas (manipulação de dados)
- ReportLab (geração de PDF)

### Infraestrutura
- GitHub Pages (hospedagem)
- GitHub Actions (CI/CD automático)

## 📝 Configuração do GitHub Pages

O site é publicado automaticamente via GitHub Pages:

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione "Deploy from a branch"
3. Escolha branch `main` e pasta `/docs`
4. Clique em **Save**

O site ficará disponível em: `https://viniszymanowski.github.io/projetocasa/app/`

## 🔄 Atualizações

### Atualizar o Sistema Web

O site em `docs/app/` é uma versão buildada (estática). Para fazer alterações:

1. Modifique o código-fonte original
2. Execute o build de produção
3. Substitua os arquivos em `docs/app/`
4. Faça commit e push para o GitHub

### Atualizar Documentação

Basta editar os arquivos Markdown em `docs/` e fazer commit.

## 📊 Fluxo de Trabalho Recomendado

1. **Coletar Dados** → Preencher questionário no sistema web
2. **Validar Conformidade** → Executar script de validação
3. **Revisar Documentação** → Atualizar arquivos Markdown conforme necessário
4. **Gerar Relatórios** → Criar PDF consolidado do projeto
5. **Organizar Arquivos** → Usar scripts para manter estrutura limpa

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas:

1. Abra uma issue descrevendo a melhoria
2. Faça um fork do repositório
3. Crie uma branch para sua feature
4. Envie um pull request

## 📄 Licença

Projeto pessoal - Todos os direitos reservados.

## 📞 Contato

Para dúvidas sobre o projeto, abra uma issue no GitHub.

---

**Última atualização:** Novembro 2025
