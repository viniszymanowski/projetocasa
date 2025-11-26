# ProjetoCasa - Sistema Interativo de Gestão

Sistema interativo de gestão e documentação de projeto residencial com editor geométrico de planta baixa.

## ✨ Funcionalidades

### Editor Geométrico (Layout)
- ✅ Criação de ambientes com formas poligonais
- ✅ Edição de vértices individuais
- ✅ **Zoom in/out** (scroll do mouse)
- ✅ **Pan** (botão direito + arrastar ou Ctrl + arrastar)
- ✅ **Réguas** nas bordas com medidas em metros
- ✅ **Rotação** de ambientes (90°, 180°)
- ✅ Grid visual com snap
- ✅ Seleção e remoção de ambientes

### Programa Arquitetônico
- ✅ Cadastro de ambientes com metragem
- ✅ Carregamento automático de dados padrão
- ✅ Distribuição por categorias
- ✅ Cálculo automático de área total
- ✅ Sincronização com página Layout

### Outras Páginas
- Dashboard inicial
- Perfil familiar (Persona)

## 🚀 Como Usar

### Instalação Local

```bash
# Clonar repositório
git clone https://github.com/viniszymanowski/projetocasa.git
cd projetocasa

# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

### Deploy

O projeto pode ser implantado em:
- **GitHub Pages** (já configurado)
- **Vercel** (recomendado)
- **Netlify**
- **Railway**
- **Render**

## 📦 Tecnologias

- React 18
- TypeScript
- Vite
- Wouter (roteamento)
- Canvas API (editor geométrico)
- LocalStorage (persistência)

## 🎯 Controles do Editor

- **Scroll do mouse**: Zoom in/out
- **Botão direito + arrastar**: Pan (mover canvas)
- **Ctrl + click + arrastar**: Pan alternativo
- **Click**: Selecionar ambiente
- **Botões de rotação**: Rotacionar 90° ou 180°

## 📝 Estrutura de Dados

Os dados são salvos no `localStorage` do navegador:

- `programa_necessidades`: Lista de ambientes cadastrados
- `layout_planta`: Elementos no canvas (posições, vértices, cores)

## 🔧 Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview
```

## 📄 Licença

Projeto pessoal - Todos os direitos reservados

---

**Desenvolvido com ❤️ por Manus AI**
