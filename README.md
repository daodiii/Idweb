# Selgenettside

Marketing / landing page built with **Next.js 16**, **Tailwind CSS 4**, and **TypeScript**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint check
```

## Project structure

```
src/
  app/               # Next.js App Router pages & layouts
    layout.tsx        # Root layout (Navbar + Footer)
    page.tsx          # Homepage
    globals.css       # Tailwind imports + CSS variables
  components/
    layout/           # Navbar, Footer — shared across all pages
    sections/         # Page sections (Hero, Features, CTA, etc.)
    ui/               # Reusable primitives (Button, Section wrapper)
  lib/                # Utility functions, constants, config
  types/              # Shared TypeScript types & interfaces
  assets/             # Static assets imported in code (SVGs, etc.)
public/
  images/             # Optimized images served from /images/
  icons/              # Favicons, app icons
```

## Tech stack

| Tool | Version |
|------|---------|
| Next.js | 16 |
| React | 19 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
