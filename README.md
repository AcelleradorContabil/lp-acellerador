# Acellerador Contábil — Landing Page

Plataforma de marketing e vendas da **Acellerador Contábil**, empresa especializada em automação de processos robóticos (RPA) para escritórios de contabilidade brasileiros.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Uso](#instalação-e-uso)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Funcionalidades](#funcionalidades)
- [API Routes](#api-routes)
- [Componentes](#componentes)
- [Hooks Customizados](#hooks-customizados)
- [Produtos e Preços](#produtos-e-preços)
- [Integração CRM](#integração-crm)

---

## Visão Geral

Landing page completa com vitrine de produtos, carrinho de compras, captura de leads e integração com WhatsApp e ClickUp. O fluxo principal é:

1. Usuário navega pelas seções da página
2. Adiciona robôs ao carrinho, ajusta quantidades e preços
3. Finaliza a compra via WhatsApp (com sugestão automática de pacote mais econômico)
4. Ou entra em contato diretamente pelo formulário de lead (integrado ao ClickUp)

---

## Stack Tecnológica

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 18 + TypeScript 5 |
| Estilização | Tailwind CSS 3 |
| Animações | Framer Motion 12 |
| Ícones | Lucide React |
| Notificações | React Hot Toast |
| Carrossel/Marquee | React Fast Marquee |
| Mapas | Leaflet + React Leaflet |
| Responsividade | React Responsive |
| Gerenciador de pacotes | Yarn |

---

## Estrutura do Projeto

```
lp-acelleraHub/
├── app/
│   ├── api/
│   │   ├── get-partners/route.ts    # Retorna lista de logos de parceiros
│   │   └── update-clickup/route.ts  # Cria tarefa no ClickUp com dados do lead
│   ├── cart-context.tsx             # Context do carrinho de compras
│   ├── context.tsx                  # Context global (sidebar, modal, loading, breakpoints)
│   ├── utils.ts                     # Função sendClickupLead()
│   ├── layout.tsx                   # Layout raiz com providers
│   ├── page.tsx                     # Página inicial
│   └── globals.css                  # Estilos globais
├── components/
│   ├── app-body/                    # Wrapper principal do layout
│   ├── header/                      # Barra de navegação desktop
│   ├── sidebar/                     # Menu mobile (hamburger)
│   ├── cart/                        # Carrinho de compras completo
│   ├── robot-card/                  # Card de produto (robô)
│   ├── card-body/                   # Container/carrossel de cards
│   ├── lead-form/                   # Formulário de contato/lead
│   ├── whatsapp-icon/               # Botão flutuante do WhatsApp
│   └── mainPageComponents/
│       ├── start.tsx                # Seção Hero
│       ├── products.tsx             # Vitrine de produtos
│       ├── packages.tsx             # Seção de pacotes/preços
│       ├── experience.tsx           # Estatísticas da empresa
│       ├── contact.tsx              # Seção de contato
│       └── partners/                # Carrossel de logos de parceiros
├── hooks/
│   ├── useScrollToSection.tsx       # Scroll suave para seção
│   ├── useActiveSection.tsx         # Detecta seção ativa no scroll
│   └── useCountAnimation.tsx        # Animação de contagem numérica
└── public/
    ├── logos/                       # Logos da marca
    ├── banners/                     # Imagens hero
    ├── partners/                    # Logos dos 18 parceiros
    ├── team/                        # Fotos da equipe
    └── icon/                        # Ícones SVG
```

---

## Instalação e Uso

**Pré-requisitos:** Node.js 18+, Yarn

```bash
# Clonar o repositório
git clone https://github.com/lucianozr/acellerador.git
cd acellerador

# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento
yarn dev
# → http://localhost:3000

# Build de produção
yarn build
yarn start

# Lint
yarn lint
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
CLICKUP_API_KEY=seu_token_aqui
```

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `CLICKUP_API_KEY` | Token de API do ClickUp para criação de tarefas (leads) | Sim |

> **Atenção:** nunca commite o arquivo `.env` com credenciais reais. O `.gitignore` já o exclui por padrão.

---

## Funcionalidades

### Navegação
- Scroll suave entre seções com indicador de seção ativa no header
- Menu responsivo: barra fixa no desktop, sidebar com hamburger no mobile

### Carrinho de Compras
- Adicionar/remover robôs com controle de quantidade
- Edição de preço unitário diretamente no carrinho
- Persistência no `localStorage` (sobrevive ao refresh)
- Cálculo automático de descontos por volume:

  | Quantidade | Desconto |
  |-----------|---------|
  | > 100 | 20% |
  | > 200 | 30% |
  | > 300 | 35% |
  | > 400 | 40% |
  | > 500 | 50% |

- Modal de sugestão de pacote: se um plano mensal for mais barato que a compra avulsa, o sistema sugere automaticamente
- Finalização via WhatsApp com resumo do pedido

### Captura de Leads
- Formulário com validação (nome, e-mail, WhatsApp, mensagem, aceite de termos)
- Envio direto para o ClickUp via API Route

### UX/Animações
- Animação de digitação no hero ("Robôs executam. Pessoas lideram.")
- Contadores animados na seção de estatísticas
- Transições com Framer Motion em todos os componentes
- Botão flutuante do WhatsApp

---

## API Routes

### `POST /api/update-clickup`

Cria uma tarefa no ClickUp com os dados do lead.

**Body (JSON):**
```json
{
  "name": "Nome do lead",
  "email": "email@exemplo.com",
  "whatsapp": "11999999999",
  "message": "Mensagem opcional"
}
```

**Resposta de sucesso:** `200 OK`

---

### `GET /api/get-partners`

Retorna a lista de nomes de arquivo dos logos dos parceiros.

**Resposta:**
```json
["parceiro1.png", "parceiro2.webp", ...]
```

---

## Componentes

| Componente | Localização | Descrição |
|-----------|-------------|-----------|
| `AppBody` | `components/app-body` | Wrapper raiz com header, sidebar e WhatsApp button |
| `Header` | `components/header` | Navegação desktop com scroll links e indicador ativo |
| `Sidebar` | `components/sidebar` | Menu mobile |
| `Cart` | `components/cart` | Carrinho completo com checkout via WhatsApp |
| `RobotCard` | `components/robot-card` | Card de produto com animações e botão de adicionar ao carrinho |
| `CardBody` | `components/card-body` | Container/carrossel de cards |
| `LeadForm` | `components/lead-form` | Formulário de captura de lead |
| `WhatsappIcon` | `components/whatsapp-icon` | Botão flutuante do WhatsApp |
| `Start` | `components/mainPageComponents/start.tsx` | Seção Hero com animação de digitação |
| `Products` | `components/mainPageComponents/products.tsx` | Vitrine dos 5 robôs |
| `Packages` | `components/mainPageComponents/packages.tsx` | Carrossel de planos/pacotes |
| `Experience` | `components/mainPageComponents/experience.tsx` | Seção de estatísticas com contador animado |
| `Contact` | `components/mainPageComponents/contact.tsx` | Formulário de contato e mapa |
| `Partners` | `components/mainPageComponents/partners` | Marquee de logos de parceiros |

---

## Hooks Customizados

### `useScrollToSection`
Scroll suave até uma seção pelo ID, com easing customizado.

```tsx
const scrollTo = useScrollToSection()
scrollTo('produtos')
```

### `useActiveSection`
Detecta qual seção está atualmente visível na viewport via `IntersectionObserver`.

```tsx
const activeSection = useActiveSection(['inicio', 'produtos', 'contato'])
```

### `useCountAnimation`
Anima um número do valor inicial até o valor final com duração configurável.

```tsx
const count = useCountAnimation({ end: 1500, duration: 2000 })
```

---

## Produtos e Preços

| Robô | Preço unitário | Função |
|------|---------------|--------|
| DCTF WEB | R$ 2,94 | Entrega de declarações fiscais |
| REINF | R$ 2,94 | Escrituração fiscal REINF |
| FGTS | R$ 2,10 | Gestão de FGTS |
| RESCISÃO | R$ 7,56 | Processamento de rescisões |
| FOLHA | R$ 1,68 | Geração de relatórios de folha |

### Pacotes

| Plano | CNPJs | Preço |
|-------|-------|-------|
| Starter | Até 100 | R$ 500–800/mês |
| Growth | 101–300 | R$ 2.500/mês |
| Scale | 301–500 | Sob consulta |
| Enterprise | 500+ | Sob consulta |

---

## Integração CRM

Os leads capturados via formulário são enviados para o **ClickUp** através da API Route `/api/update-clickup`. A chave de API é configurada pela variável de ambiente `CLICKUP_API_KEY`.

O carrinho de compras integra diretamente com o **WhatsApp** — ao finalizar a compra, o sistema monta uma mensagem com os itens, quantidades, preços e totais e abre o WhatsApp do time comercial.

---

## Licença

MIT © Luciano
