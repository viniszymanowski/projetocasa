# Guia de Configuração do GitHub Pages

Este guia explica como configurar o GitHub Pages para publicar o painel web do ProjetoCasa.

## Método 1: Configuração Manual (Mais Simples)

### Passo 1: Acessar Configurações do Repositório
1. Acesse seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**

### Passo 2: Configurar a Fonte
1. Em **Source** (Fonte), selecione **Deploy from a branch**
2. Em **Branch**, selecione:
   - Branch: `main` (ou `master`)
   - Folder: `/docs`
3. Clique em **Save**

### Passo 3: Aguardar o Deploy
- O GitHub levará alguns minutos para publicar o site
- Quando concluído, aparecerá uma mensagem com a URL do site
- A URL será algo como: `https://viniszymanowski.github.io/projetocasa/sistema/`

### Passo 4: Acessar o Painel
- Acesse a URL fornecida + `/sistema/`
- Exemplo: `https://viniszymanowski.github.io/projetocasa/sistema/`

## Método 2: GitHub Actions (Automático)

### Passo 1: Criar o Workflow
O arquivo `.github/workflows/pages.yml` já foi criado neste projeto.

### Passo 2: Configurar Permissões
1. Acesse **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve as alterações

### Passo 3: Fazer Commit e Push
```bash
git add .github/workflows/pages.yml
git commit -m "Adicionar workflow do GitHub Pages"
git push
```

### Passo 4: Verificar o Deploy
1. Acesse a aba **Actions** no repositório
2. Você verá o workflow "Deploy GitHub Pages" em execução
3. Quando concluído (ícone verde ✓), o site estará publicado

## Ajustes Necessários nos Arquivos HTML

### Corrigir Caminhos Relativos
Como o site será publicado em um subdiretório, pode ser necessário ajustar alguns caminhos nos arquivos HTML.

#### No arquivo `docs/sistema/index.html`:
Procure por links que começam com `/` e ajuste para caminhos relativos:

**Antes:**
```html
<a href="/projetocasa/terreno/fotos-terreno.html">
```

**Depois:**
```html
<a href="../terreno/fotos-terreno.html">
```

#### No arquivo `docs/sistema/questionario.html`:
Verifique se os links para CSS e JS estão corretos:
```html
<link rel="stylesheet" href="style.css" />
<script src="script.js"></script>
```

## Testando Localmente

Antes de publicar, você pode testar localmente usando um servidor HTTP simples:

```bash
cd docs/sistema
python -m http.server 8000
```

Depois acesse: `http://localhost:8000/`

## Solução de Problemas

### O site não carrega
- Verifique se o deploy foi concluído com sucesso em **Actions**
- Aguarde alguns minutos após o deploy
- Limpe o cache do navegador (Ctrl+F5)

### CSS/JS não carregam
- Verifique os caminhos relativos nos arquivos HTML
- Abra o Console do navegador (F12) para ver erros

### Imagens não aparecem
- Certifique-se de que as imagens estão na pasta `docs/` ou subpastas
- Ajuste os caminhos para serem relativos à estrutura do GitHub Pages

## Atualizando o Site

Sempre que você fizer alterações nos arquivos em `docs/sistema/`:

1. Faça commit das alterações
2. Faça push para o GitHub
3. O GitHub Pages atualizará automaticamente (pode levar 1-2 minutos)

```bash
git add docs/sistema/
git commit -m "Atualizar painel web"
git push
```

## URL Personalizada (Opcional)

Se você tiver um domínio próprio, pode configurá-lo:

1. Em **Settings** → **Pages**
2. Em **Custom domain**, digite seu domínio
3. Configure os registros DNS conforme instruções do GitHub

---

**Pronto!** Seu painel web estará acessível publicamente via GitHub Pages. 🎉
