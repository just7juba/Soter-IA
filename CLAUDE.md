# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Soter IA** — an enterprise AI Copilot for Intellectual Property (IP) management. French-language UI targeting IP attorneys, patent examiners, and corporate legal counsel. Originally scaffolded from Google AI Studio.

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build (output: `dist/`)
- `npm run lint` — Type-check only (`tsc --noEmit`); no ESLint configured
- `npm run preview` — Preview production build
- `npm run clean` — Remove `dist/`

No test framework is configured.

## Architecture

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 (via `@tailwindcss/vite` plugin)

**Entry flow:** `index.html` → `src/main.tsx` → `src/App.tsx`

**App.tsx** is the application shell. It owns:
- Onboarding screen (role selection)
- Sidebar navigation with tab-based routing (`activeTab` state)
- Floating AI chat panel (mock responses, no real AI integration yet)
- A "Legal Box" (Boîte Juridique) footer section

**Tab → Component mapping** (all in `src/components/`):
- Dashboard → `Dashboard.tsx`
- Patents (Dossiers) → `IPDirectory.tsx`
- Search (Recherche) → `PriorArtSearch.tsx`
- Drafting (Co-Rédaction) → `LegalDrafting.tsx`
- Classification → `ClassSearch.tsx`
- Audit → `AuditLogs.tsx`

`Trademarks.tsx` exists but is not routed to from the sidebar.

**Data layer:** All data is mock/hardcoded. `src/types.ts` exports `MOCK_CASES`, `USER_PROFILES`, and the core TypeScript interfaces (`Case`, `Message`, `UserRole`). There is no backend or API integration.

**Styling system:**
- Tailwind v4 with `@theme` config in `src/index.css`
- Custom brand colors: `midnight` (#020617), `beige` (#F5F5ED) and their variants
- Fonts: Inter (sans), JetBrains Mono (mono)
- `cn()` utility in `src/lib/utils.ts` (clsx + tailwind-merge)

**Key libraries:** `motion` (framer-motion) for animations, `lucide-react` for icons, `react-markdown` (imported but not visibly used yet)

## Path Alias

`@/*` maps to project root (configured in both `tsconfig.json` and `vite.config.ts`). Example: `import { cn } from '@/src/lib/utils'`.

## Environment

Requires `GEMINI_API_KEY` in `.env.local` (see `.env.example`). The key is injected into the client bundle via Vite's `define` in `vite.config.ts`.
