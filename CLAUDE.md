# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev      # Development server at localhost:3000
yarn build    # Production build
yarn start    # Start production server
yarn lint     # ESLint
```

## Architecture

Next.js 16 App Router project. No pages/ directory — all routes live under `app/`.

### State Management

Two React Contexts handle all shared state:

- **`app/context.tsx`** (`GlobalContext`) — UI state: sidebar open/close, modal visibility, loading state, and responsive breakpoints (via `react-responsive`).
- **`app/cart-context.tsx`** (`CartContext`) — Shopping cart: items, quantities, unit price editing, discount calculation, localStorage persistence, and plan-suggestion logic.

Both are provided at the root in `app/layout.tsx`.

### Page Structure

`app/page.tsx` renders a single home page composed of six sequential sections from `components/mainPageComponents/`:

```
start → products → packages → experience → contact → partners
```

All sections are wrapped by `components/app-body/`, which mounts the header, mobile sidebar, and the floating WhatsApp button.

### Lead → CRM Flow

`components/lead-form/` → `app/utils.ts` (`sendClickupLead`) → `app/api/update-clickup/route.ts` → ClickUp API.

Requires `CLICKUP_API_KEY` in `.env`.

### Cart → WhatsApp Checkout Flow

`components/robot-card/` (add to cart) → `components/cart/` (adjust qty/price, view totals) → on checkout, cart checks if a package plan is cheaper than individual items → shows modal (`components/cart/`) suggesting the plan → otherwise sends WhatsApp message with order summary.

### Custom Hooks

- `hooks/useScrollToSection.tsx` — smooth scroll to section by element ID with custom easing; used by header and sidebar nav links.
- `hooks/useActiveSection.tsx` — `IntersectionObserver`-based hook that returns the ID of the section currently in viewport; drives the active indicator in the header.
- `hooks/useCountAnimation.tsx` — animates a number from 0 to a target value; used in the experience/stats section.

## Key Conventions

- **Path alias:** `@/*` resolves to the project root (defined in `tsconfig.json`).
- **Brand colors** are defined in `tailwind.config.ts`: `mainOrange` (`#e76714`) and `blueAcellera` (`#033f6f`).
- All component folders use an `index.tsx` entry point.
- `components/index.tsx` re-exports all components for cleaner imports.
