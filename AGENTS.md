# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Commands

- **Package manager**: pnpm
- `pnpm dev` — Start dev server (Vite, default port 5173)
- `pnpm build` — Type-check (`tsc -b`) then build for production
- `pnpm lint` — ESLint check
- `pnpm preview` — Preview production build locally
- Type-check only: `npx tsc --noEmit`

## Architecture

An Apple-style AI tool directory website. All data is static (no API/backend). React 19 + TypeScript + Tailwind CSS v4 + Zustand 5.

### Routing

React Router v8 with lazy-loaded route components (`src/routes/`). `RootLayout` wraps all pages with Navbar, Footer, and a `<Suspense>` skeleton fallback.

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `home.tsx` | Hero + featured cards + category grid + popular tools |
| `/category/:categoryId?` | `category.tsx` | Category nav tabs + filtered tool grid |
| `/tool/:toolId` | `tool-detail.tsx` | Tool info card + features + related tools |
| `/search` | `search.tsx` | Search results with debounced query |
| `/favorites` | `favorites.tsx` | User's favorited tools |

### Data Layer (`src/data/`)

All tool and category data lives in static TypeScript arrays — no database or API calls.

- `tools.ts` — ~40+ AI tools with `AITool` interface (id, name, tagline, features, pricing, tags, logo emoji, etc.)
- `categories.ts` — 8 categories, each with a Lucide icon name string and brand color
- `featured.ts` — Homepage config: hero text, featured large card tool IDs

When adding new tools, append to the appropriate category section in `tools.ts` and increment `order` within that section.

### State Management

Zustand store in `src/store/favoritesStore.ts` with `persist` middleware — favorites are stored as a `string[]` of tool IDs in `localStorage` under key `ai-nav-favorites`.

### Search (`src/lib/search.ts`)

Client-side weighted search across name (10pts), tags (6pts), tagline (4pts), description (2pts). Results sorted by score descending.

### Path Aliases

`@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

## Design System (`src/index.css`)

Apple-inspired design using Tailwind CSS v4 with `@theme` tokens. Key design tokens:

- **Fonts**: SF Pro Display/Text via `-apple-system` stack, with PingFang SC for Chinese
- **Colors**: Apple system colors — text `#1d1d1f`/`#6e6e73`/`#86868b`, link `#0071e3`, backgrounds `#fff`/`#f5f5f7`/`#1d1d1f`
- **Radii**: `--radius-sm` (8px) through `--radius-full` (980px pill)
- **Shadows**: `--shadow-card` (subtle) → `--shadow-card-hover` (elevated on hover with `translateY(-3px)`)
- **Easing**: `--ease-apple` (0.4, 0, 0.2, 1), `--ease-apple-spring` (0.34, 1.56, 0.64, 1)

Component classes defined in `@layer components`: `glass-nav`, `btn-primary`, `btn-secondary`, `card-base`, `card-hover`.

### Critical Tailwind v4 Note

All custom CSS rules MUST be inside `@layer base` or `@layer components`. Unlayered CSS has **higher specificity** than Tailwind's `@layer utilities` in the v4 cascade layers system, which will silently break utility classes like `mx-auto` or `text-center`.

## Key Conventions

- **Icons**: Lucide React (`lucide-react`) for all icons. Category icons are referenced by Lucide component name string (e.g., `'FileText'`) in `categories.ts` data.
- **Tool logos**: Emoji characters rendered via `ToolLogo` component, displayed on a colored circle background.
- **UI components**: `Button`, `Badge`, `Card`, `SearchBar`, `Skeleton` in `src/components/ui/`.
- **Spacing**: Section padding `py-20 md:py-28`, content max-width `max-w-[1080px]` (tool detail uses `max-w-[744px]`).
- **Hero backgrounds**: CSS radial gradients (no images). Each page has a unique color theme — blue/green for home, blue/purple for categories, pink/orange for favorites.
- **Text alignment**: All section titles and card content are left-aligned. Only the Hero section (home/category/favorites) uses `text-center`.
- **Feature icons** on tool detail pages use a keyword-to-icon mapping (`FEATURE_ICON_MAP` in `tool-detail.tsx`) with Apple blue-tinted rounded-square containers.
