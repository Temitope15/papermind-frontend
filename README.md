# PaperMind — Landing Page

Marketing site for [PaperMind](https://github.com/Temitope15/papermind), built with Next.js 14 (static export). Hosted on Vercel.

## Stack

- **Next.js 14** App Router with `output: 'export'` (pure static site, no server functions)
- **Tailwind CSS** with Midnight & Glass design tokens
- **Framer Motion** for scroll-triggered and continuous animations
- **DM Serif Display** + **Inter** + **JetBrains Mono** via `next/font/google`
- **Material Symbols** via Google Fonts CDN

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & preview the static export

```bash
npm run build        # produces out/
npx serve out        # preview locally
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel               # follow prompts
vercel --prod        # production deploy
```

Or connect this repo to Vercel via the dashboard — it auto-detects Next.js and uses the right build settings.

## Configure download URLs

`lib/downloads.ts` exports the URLs for each platform's binary. Update `REPO` and `VERSION` after each release:

```ts
export const REPO = 'Temitope15/papermind'
export const VERSION = '0.2.0'
```

The URLs auto-resolve to `https://github.com/{REPO}/releases/latest/download/PaperMind-{VERSION}.{dmg|exe|AppImage}`.

## Sections

| Section | Component | Notes |
|---------|-----------|-------|
| Navbar | `Navbar.tsx` | Floating pill, scroll-aware blur, OS-aware Download CTA |
| Hero | `Hero.tsx` | Animated visual + OS-detected download buttons |
| AI Explainer | `AIExplainer.tsx` | Real typewriter streaming of a contract analysis |
| Document Vault | `DocumentVault.tsx` | Floating Living Letter card |
| Translator | `Translator.tsx` | Side-by-side DE→EN typewriter on a real birth certificate |
| Privacy | `Privacy.tsx` | 3-card grid with hero center card |
| How It Works | `HowItWorks.tsx` | 3 steps with animated SVG connector + traveling pulse |
| CTA | `CTA.tsx` | OS-detected primary button with "Your OS" badge |
| Footer | `Footer.tsx` | Brand, links, social |
