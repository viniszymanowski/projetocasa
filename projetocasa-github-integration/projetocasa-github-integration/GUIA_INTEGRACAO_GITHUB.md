# 🚀 Guia de Integração com GitHub

Este guia explica como integrar o sistema interativo ProjetoCasa ao seu repositório GitHub existente.

## 📦 O Que Você Vai Fazer

Você vai substituir o conteúdo atual do repositório `viniszymanowski/projetocasa` por esta nova versão que inclui o sistema web interativo, mantendo toda a documentação e scripts existentes.

## ⚠️ Antes de Começar

**IMPORTANTE:** Faça backup do repositório atual antes de prosseguir!

```bash
# Clone o repositório atual para backup
git clone https://github.com/viniszymanowski/projetocasa.git projetocasa-backup
```

## 📋 Método 1: Substituição Completa (Recomendado)

### Passo 1: Baixar os Arquivos

1. Baixe o arquivo `projetocasa-github-integration.zip` que foi fornecido
2. Extraia o conteúdo em uma pasta no seu computador

### Passo 2: Preparar o Repositório

```bash
# Clone o repositório atual
git clone https://github.com/viniszymanowski/projetocasa.git
cd projetocasa

# Remova todos os arquivos (exceto .git)
find . -not -path "./.git/*" -not -name ".git" -delete

# Copie os novos arquivos
cp -r /caminho/para/projetocasa-github-integration/* .
```

### Passo 3: Fazer Commit e Push

```bash
# Adicione todos os arquivos
git add .

# Faça commit
git commit -m "Integrar sistema web interativo ao projeto"

# Envie para o GitHub
git push origin main
```

### Passo 4: Configurar GitHub Pages

1. Acesse: `https://github.com/viniszymanowski/projetocasa/settings/pages`
2. Em **Source**, selecione "Deploy from a branch"
3. Escolha branch `main` e pasta `/docs`
4. Clique em **Save**
5. Aguarde alguns minutos

### Passo 5: Acessar o Site

Após a publicação, acesse:
```
https://viniszymanowski.github.io/projetocasa/app/
```

---

## 📋 Método 2: Via Interface Web do GitHub

### Passo 1: Preparar Arquivos

1. Extraia o arquivo `projetocasa-github-integration.zip`
2. Organize os arquivos conforme a estrutura

### Passo 2: Upload via GitHub

1. Acesse: `https://github.com/viniszymanowski/projetocasa`
2. Clique em **Add file** → **Upload files**
3. Arraste TODOS os arquivos e pastas extraídos
4. Escreva a mensagem: "Integrar sistema web interativo"
5. Clique em **Commit changes**

**⚠️ Atenção:** Este método pode ter limitações de tamanho. Use o Método 1 se tiver problemas.

### Passo 3: Configurar GitHub Pages

Siga o **Passo 4** do Método 1.

---

## 📋 Método 3: Atualização Incremental

Se preferir manter o histórico Git completo:

### Passo 1: Adicionar Novo Sistema

```bash
# Clone o repositório
git clone https://github.com/viniszymanowski/projetocasa.git
cd projetocasa

# Crie uma nova branch
git checkout -b feature/sistema-interativo

# Adicione a pasta do sistema web
mkdir -p docs/app
cp -r /caminho/para/projetocasa-github-integration/docs/app/* docs/app/

# Adicione o redirecionamento
cp /caminho/para/projetocasa-github-integration/docs/sistema/index.html docs/sistema/
```

### Passo 2: Atualizar Scripts

```bash
# Copie os novos scripts
cp /caminho/para/projetocasa-github-integration/scripts/*.py scripts/

# Atualize o README
cp /caminho/para/projetocasa-github-integration/README.md .
```

### Passo 3: Commit e Merge

```bash
# Adicione as mudanças
git add .

# Faça commit
git commit -m "Adicionar sistema web interativo"

# Volte para main e faça merge
git checkout main
git merge feature/sistema-interativo

# Envie para o GitHub
git push origin main
```

---

## ✅ Verificação

Após a integração, verifique:

- [ ] Site acessível em `https://viniszymanowski.github.io/projetocasa/app/`
- [ ] Navegação funcionando entre todas as páginas
- [ ] Dashboard exibindo métricas
- [ ] Questionário abrindo corretamente
- [ ] Checklist de conformidade visível
- [ ] Galeria de fotos organizada
- [ ] Documentação Markdown acessível

## 🔧 Estrutura Final Esperada

```
projetocasa/
├── .gitignore
├── README.md
├── GUIA_INTEGRACAO_GITHUB.md
├── docs/
│   ├── app/                    # ✨ NOVO: Sistema web interativo
│   │   ├── index.html
│   │   └── assets/
│   ├── sistema/                # Redirecionamento
│   │   └── index.html
│   ├── sistema-antigo/         # Backup do painel original
│   ├── arquitetura/
│   ├── persona/
│   ├── terreno/
│   ├── normas/
│   └── decisoes/
├── scripts/
│   ├── validar_completo.py     # ✨ NOVO
│   ├── json_para_csv.py        # ✨ NOVO
│   ├── gerar_relatorio_pdf.py  # ✨ NOVO
│   ├── organizar_fotos.py
│   └── organizar_referencias.py
├── tools/
│   └── validacao/
└── data/
    └── respostas_questionario.json
```

## 🎨 Personalização Pós-Integração

### Alterar Cores do Site

As cores estão definidas nos arquivos CSS buildados. Para alterações, será necessário:
1. Modificar o código-fonte original
2. Fazer novo build
3. Substituir os arquivos em `docs/app/`

### Adicionar Conteúdo

- **Documentação:** Edite os arquivos `.md` em `docs/`
- **Dados do projeto:** Atualize `data/respostas_questionario.json`
- **Fotos:** Adicione imagens nas pastas apropriadas

## 🆘 Resolução de Problemas

### Site não carrega

- Verifique se GitHub Pages está ativado
- Confirme que a pasta `/docs` está selecionada
- Aguarde 2-5 minutos após o push

### Página em branco

- Verifique o console do navegador (F12)
- Confirme que todos os arquivos foram enviados
- Teste em modo anônimo (pode ser cache)

### Erros 404

- Verifique os caminhos dos arquivos
- Confirme que `index.html` está em `docs/app/`
- Teste localmente primeiro

### Scripts Python não funcionam

- Instale dependências: `pip install pandas reportlab`
- Verifique a versão do Python (3.x necessário)
- Execute do diretório raiz do projeto

## 📞 Suporte

Se encontrar problemas:

1. Verifique este guia novamente
2. Consulte o README.md do projeto
3. Abra uma issue no GitHub descrevendo o problema

---

**Boa integração! 🎉**
