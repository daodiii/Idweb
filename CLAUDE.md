# Selgenettside — Project Instructions

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript 5
- Tailwind CSS 4 (v4 syntax: `@import "tailwindcss"`, `@theme inline`)
- No component library — custom components in `src/components/ui/`

## Architecture
- Pages live in `src/app/` using the App Router
- Shared layout (Navbar, Footer) wraps all pages via `src/app/layout.tsx`
- Page sections go in `src/components/sections/` (Hero, Features, CTA, etc.)
- Reusable primitives go in `src/components/ui/` (Button, Section, Card, etc.)
- Layout-level components go in `src/components/layout/`
- Helpers and constants go in `src/lib/`
- Shared types go in `src/types/`

## Conventions
- Use `@/` path alias for all imports (maps to `src/`)
- CSS variables defined in `globals.css` — use `var(--color-*)` for theming
- Norwegian language for user-facing text (nav labels, footer, CTAs)
- English for code: variable names, comments, commit messages

## Styling rules
- Use Tailwind utility classes — avoid inline styles and CSS modules
- Reference CSS variables with `[var(--color-*)]` bracket syntax in Tailwind
- Dark mode via `prefers-color-scheme` media query (CSS variables swap automatically)
- Max content width: `max-w-6xl` (1152px), padding: `px-6`

## File naming
- Components: `kebab-case.tsx` (e.g., `hero-section.tsx`)
- Types: `kebab-case.ts` (e.g., `site-config.ts`)
- One exported component per file, named export (not default) for components
- Page files (`page.tsx`, `layout.tsx`) use default exports per Next.js convention
