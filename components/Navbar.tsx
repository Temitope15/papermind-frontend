'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#ai-explainer', label: 'AI Explainer' },
  { href: '#document-vault', label: 'Document Vault' },
  { href: '#secure-translator', label: 'Translator' },
  { href: '#how-it-works', label: 'How It Works' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const padding = useTransform(scrollY, [0, 100], ['1.5rem', '1rem'])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ paddingTop: padding }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4"
    >
      <header
        className={`navbar-glass rounded-full pl-4 pr-1.5 py-1.5 sm:pl-6 sm:pr-2 sm:py-2 flex items-center gap-3 md:gap-8 shadow-2xl transition-all duration-500 ${
          scrolled ? 'shadow-black/40' : 'shadow-transparent'
        }`}
      >
        <a href="#" className="flex items-center gap-2 shrink-0">
          <Logo />
          <span className="font-serif text-lg sm:text-xl text-primary tracking-tight">PaperMind</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-1.5 text-on-surface/70 hover:text-primary transition-colors text-sm font-medium group"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full transition-colors" />
            </a>
          ))}
        </nav>

        <a
          href="#download"
          className="flex items-center bg-primary text-on-primary px-3 sm:px-4 py-1.5 rounded-full gap-1.5 sm:gap-2 font-bold hover:scale-[1.04] active:scale-95 transition-all mint-glow shrink-0"
        >
          <span className="material-symbols-outlined filled text-[15px] sm:text-[16px]">download</span>
          <span className="text-[11px] sm:text-[12px] font-bold tracking-wide uppercase">Download</span>
        </a>
      </header>
    </motion.div>
  )
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="3" width="20" height="26" rx="3" stroke="#9af6df" strokeWidth="1.6" />
      <path d="M11 11h10M11 16h10M11 21h6" stroke="#9af6df" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="23" cy="22" r="3.2" fill="#9af6df" />
    </svg>
  )
}
