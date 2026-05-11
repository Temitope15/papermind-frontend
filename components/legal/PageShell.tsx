'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {
  eyebrow: string
  title: string
  subtitle: string
  updated?: string
  children: React.ReactNode
}

export function PageShell({ eyebrow, title, subtitle, updated, children }: Props) {
  return (
    <main className="relative pt-32 pb-24 px-margin-desktop overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute inset-0 grid-bg opacity-25 -z-10" />
      <div className="absolute top-32 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-96 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[160px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-on-surface/60 hover:text-primary transition-colors w-fit"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to PaperMind
          </Link>

          <div className="inline-flex items-center w-fit px-3 py-1 rounded-full glass-panel gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot shadow-[0_0_8px_#9af6df]" />
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              {eyebrow}
            </span>
          </div>

          <h1 className="font-serif text-display-lg md:text-[56px] text-on-surface leading-tight">
            {title}
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          {updated && (
            <p className="text-xs font-mono text-on-surface/40 uppercase tracking-widest">
              Last updated · {updated}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-12"
        >
          {children}
        </motion.div>
      </div>
    </main>
  )
}

export function Section({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="glass-panel rounded-[32px] p-8 md:p-12 border-white/5">
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-mono font-bold">
          {number}
        </span>
        <h2 className="font-serif text-headline-lg text-on-surface">{title}</h2>
      </div>
      <div className="flex flex-col gap-4 text-on-surface-variant leading-relaxed text-body-md">
        {children}
      </div>
    </section>
  )
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-mono font-bold text-primary uppercase tracking-widest">
      {children}
    </span>
  )
}
