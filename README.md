# 🏠 ProjetoCasa - Sistema Interativo de Gestão

Sistema completo e inteligente para planejamento e gestão de projetos residenciais, com sugestões automáticas baseadas em IA e integração total entre todas as funcionalidades.

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://viniszymanowski.github.io/projetocasa/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌟 Funcionalidades Principais

### 📋 Gestão de Dados
- **Contrato**: Dados completos do terreno, vendedor, compradores e valores
- **Terreno**: Características técnicas, topografia, insolação e localização
- **Persona**: Perfil dos moradores, hobbies, rotina e necessidades
- **Preferências**: Estilos arquitetônicos, cores, materiais e acabamentos

### 🏗️ Planejamento Arquitetônico
- **Arquitetura**: Criação e gerenciamento de ambientes com metragem
- **Layout**: Editor visual com grid, réguas e edição de vértices
  - ✅ Zoom in/out (scroll do mouse)
  - ✅ Pan (botão direito + arrastar)
  - ✅ Réguas com medidas em metros
  - ✅ Edição de vértices por arrastar
  - ✅ Rotação de ambientes (90°, 180°)
- **Questionário**: 14 perguntas estratégicas sobre o projeto
- **Normas**: Checklist interativo de conformidade com códigos de obra

### 💰 Gestão Financeira
- **Financeiro**: Controle completo de custos e despesas
  - Importação automática dos dados do contrato
  - Despesas por categoria com gráficos de progresso
  - Marcação de pagamentos (pago/pendente)
  - Resumo financeiro (total, pago, pendente)

### 🎨 Inspiração e Referências
- **Galeria**: Upload e organização de fotos por ambiente
- **Moodboard**: Inspirações visuais com sugestões inteligentes de cores e materiais
- **Meu Projeto**: Dashboard com progresso e sugestões personalizadas

### 🧠 Sistema de Sugestões Inteligentes

O sistema analisa todos os dados preenchidos e fornece sugestões personalizadas:

- **Materiais**: Baseado no estilo arquitetônico escolhido
- **Cores**: Paleta harmoniosa com suas preferências
- **Ambientes**: Sugestões baseadas em persona e questionário
- **Tecnologias**: Recomendações por custo/benefício
- **Dimensões**: Tamanhos ideais baseados no terreno

## 🚀 Tecnologias

- **Frontend**: React 19 + TypeScript
- **Roteamento**: Wouter (hash-based routing)
- **Ícones**: Lucide React
- **Build**: Vite
- **Deploy**: GitHub Pages
- **Armazenamento**: LocalStorage (dados persistentes no navegador)

## 📦 Estrutura do Projeto

```
projetocasa-source/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Sidebar.tsx    # Menu lateral de navegação
│   │   └── ...
│   ├── pages/             # Páginas do sistema (14 páginas)
│   │   ├── Dashboard.tsx
│   │   ├── Contrato.tsx
│   │   ├── Terreno.tsx
│   │   ├── Persona.tsx
│   │   ├── Preferencias.tsx
│   │   ├── Arquitetura.tsx
│   │   ├── Layout.tsx
│   │   ├── Normas.tsx
│   │   ├── Galeria.tsx
│   │   ├── Questionario.tsx
│   │   ├── MeuProjeto.tsx
│   │   ├── Moodboard.tsx
│   │   ├── Financeiro.tsx
│   │   ├── Fornecedores.tsx
│   │   └── Configuracoes.tsx
│   ├── lib/
│   │   └── projectData.ts # Sistema de sugestões inteligentes
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/viniszymanowski/projetocasa.git
cd projetocasa

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📊 Fluxo de Uso Recomendado

1. **Dados Básicos**
   - Preencha **Contrato** (dados já importados automaticamente)
   - Complete **Terreno** com características técnicas
   - Defina **Persona** dos moradores

2. **Planejamento**
   - Responda o **Questionário** (14 perguntas)
   - Configure **Preferências** de estilo e cores
   - Crie ambientes na **Arquitetura**

3. **Design**
   - Organize ambientes no **Layout** visual
   - Adicione fotos na **Galeria**
   - Monte o **Moodboard** com inspirações

4. **Gestão**
   - Acompanhe custos no **Financeiro**
   - Verifique **Normas** de conformidade
   - Monitore progresso em **Meu Projeto**

## 💾 Armazenamento de Dados

Todos os dados são salvos automaticamente no **localStorage** do navegador:

| Chave | Conteúdo |
|-------|----------|
| `projetocasa_contrato` | Dados do contrato |
| `projetocasa_terreno` | Informações do terreno |
| `projetocasa_persona` | Perfil dos moradores |
| `projetocasa_preferencias` | Estilos e preferências |
| `projetocasa_ambientes` | Ambientes criados |
| `projetocasa_galeria` | Fotos do projeto |
| `projetocasa_moodboard` | Inspirações visuais |
| `projetocasa_questionario` | Respostas do questionário |
| `projetocasa_normas` | Checklist de conformidade |
| `projetocasa_financeiro` | Despesas e pagamentos |
| `layout_planta` | Layout dos ambientes |

### Backup e Restauração

Use a página **Configurações** para:
- **Exportar**: Baixar todos os dados em formato JSON
- **Importar**: Restaurar dados de um backup
- **Limpar**: Apagar todos os dados salvos

## 🎨 Sistema de Sugestões

O sistema analisa os dados preenchidos e fornece sugestões inteligentes:

### Exemplo: Estilo Moderno
```typescript
Preferências: { estiloArquitetonico: "Moderno" }

Sugestões geradas:
- Materiais: Porcelanato grande formato, Alumínio preto, Ripados
- Cores: #2C2C2C, #808080, #D3D3D3, #8B4513
- Tecnologias: LED inteligente, Fechaduras eletrônicas
```

### Exemplo: Persona com Pets
```typescript
Persona: { pets: "Sim, 2 cães" }

Sugestões geradas:
- Ambientes: "Área para Pets" (prioridade média)
- Dimensões: Área externa mínima de 15m²
```

## 🎯 Controles do Editor de Layout

| Ação | Controle |
|------|----------|
| Zoom in/out | Scroll do mouse |
| Pan (mover canvas) | Botão direito + arrastar |
| Selecionar ambiente | Click no ambiente |
| Editar vértices | Botão "Editar Vértices" → Arrastar círculos azuis |
| Rotacionar | Botões "Rotacionar 90°" / "Rotacionar 180°" |
| Adicionar ambiente | Dropdown + "Adicionar ao Layout" |

## 🔧 Configuração

### Hash-based Routing

O projeto usa hash-based routing para compatibilidade com GitHub Pages:

```typescript
// main.tsx
import { useHashLocation } from 'wouter/use-hash-location';

<Router hook={useHashLocation}>
  <App />
</Router>
```

### URLs do Sistema

| Página | URL |
|--------|-----|
| Dashboard | `/#/` |
| Contrato | `/#/contrato` |
| Terreno | `/#/terreno` |
| Persona | `/#/persona` |
| Preferências | `/#/preferencias` |
| Arquitetura | `/#/arquitetura` |
| Layout | `/#/layout` |
| Normas | `/#/normas` |
| Galeria | `/#/galeria` |
| Questionário | `/#/questionario` |
| Meu Projeto | `/#/meu-projeto` |
| Moodboard | `/#/moodboard` |
| Financeiro | `/#/financeiro` |
| Fornecedores | `/#/fornecedores` |
| Configurações | `/#/configuracoes` |

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 💻 Desktop (1920x1080+)
- 💻 Laptop (1366x768+)
- 📱 Tablet (768x1024+)
- 📱 Mobile (375x667+)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Vinicius Alexandre Schimaniak Szymanowski** - [GitHub](https://github.com/viniszymanowski)
  - Email: viniszymanowski@gmail.com
  - Telefone: (67) 99620-8627
- **Daniela Bertoldi**
  - Email: danielabertoldi@gmail.com
  - Telefone: (67) 99800-3409

## 🙏 Agradecimentos

- Comunidade React
- Lucide Icons
- Vite
- GitHub Pages
- Manus AI

## 📈 Roadmap

- [ ] Exportar layout como imagem/PDF
- [ ] Integração com Google Drive
- [ ] Modo colaborativo (múltiplos usuários)
- [ ] App mobile nativo
- [ ] Integração com fornecedores
- [ ] Orçamento automático baseado em IA

---

**🏠 ProjetoCasa** - Transformando sonhos em projetos reais

**Desenvolvido com ❤️ por Manus AI**
