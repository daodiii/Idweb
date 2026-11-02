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

## Brand assets

The header and footer pair the approved IDweb wordmark with the animated Night Signal symbol.
Visitors who prefer reduced motion receive its static WebP frame. The footer uses a light wordmark
for contrast. Favicons, app icons, and the structured-data logo use the same static symbol.

Source artwork is in `tools/assets/idweb-night-signal.png` and `tools/assets/idweb-wordmark.png`.
After replacing approved source artwork, regenerate derived assets with:

```bash
node tools/create-brand-assets.mjs
node tools/create-favicons.mjs
```

The approved six-second animation is served directly from `public/images/brand/idweb-night-signal.gif`.
Replace that file separately when updating motion; regeneration preserves it.

## Tech stack

| Tool | Version |
|------|---------|
| Next.js | 16 |
| React | 19 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
