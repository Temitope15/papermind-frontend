'use client'

import { REPO } from '@/lib/downloads'

const PRODUCT_LINKS = [
  { href: '#ai-explainer', label: 'AI Explainer' },
  { href: '#document-vault', label: 'Legacy Vault' },
  { href: '#secure-translator', label: 'Translator' },
  { href: '#download', label: 'Download' },
]

const COMPANY_LINKS = [
  { href: `https://github.com/${REPO}`, label: 'Source Code' },
  { href: '/docs', label: 'Docs' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: `https://github.com/${REPO}/issues`, label: 'Report an Issue' },
]

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 pt-24 pb-12 px-margin-desktop">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="3" width="20" height="26" rx="3" stroke="#9af6df" strokeWidth="1.6" />
                <path d="M11 11h10M11 16h10M11 21h6" stroke="#9af6df" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="23" cy="22" r="3.2" fill="#9af6df" />
              </svg>
              <span className="font-serif text-3xl text-primary">PaperMind</span>
            </div>
            <p className="text-on-surface-variant max-w-sm leading-relaxed">
              Building the future of digital inheritance through local-first AI
              and uncompromising privacy.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot shadow-[0_0_8px_#9af6df]" />
                Solana Devnet
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[14px]">memory</span>
                Local AI
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[14px]">code</span>
                Open Source
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-6">
            <p className="font-bold text-on-surface tracking-widest uppercase text-xs">
              Product
            </p>
            <nav className="flex flex-col gap-4">
              {PRODUCT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-6">
            <p className="font-bold text-on-surface tracking-widest uppercase text-xs">
              Resources
            </p>
            <nav className="flex flex-col gap-4">
              {COMPANY_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10 gap-6">
          <p className="text-sm text-on-surface/40 font-mono">
            © 2026 PaperMind. No cookies. No tracking. Built locally with care.
          </p>
          <div className="flex gap-4">
            <a
              href={`https://github.com/${REPO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-on-surface/40 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38s1.95.13 2.86.38c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-on-surface/40 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Terminal"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-on-surface/40 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Shield"
            >
              <span className="material-symbols-outlined text-[16px]">shield</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
