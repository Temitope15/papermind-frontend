'use client'

import { motion } from 'framer-motion'
import { DOWNLOADS, VERSION, REPO, type Platform } from '@/lib/downloads'
import { useDetectedOS } from '@/lib/useDetectedOS'

const PLATFORMS: { id: Platform; label: string; icon: 'download' | 'window' | 'terminal' }[] = [
  { id: 'mac', label: 'Download for Mac', icon: 'download' },
  { id: 'windows', label: 'Windows', icon: 'window' },
  { id: 'linux', label: 'Linux', icon: 'terminal' },
]

const PLATFORM_NAMES: Record<Platform, string> = {
  mac: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
}

export function CTA() {
  const detected = useDetectedOS()

  return (
    <section id="download" className="py-32 px-margin-desktop relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto glass-panel p-12 md:p-20 rounded-[48px] md:rounded-[64px] text-center flex flex-col items-center gap-8 border-primary/20 relative overflow-hidden mint-glow-strong"
      >
        {/* Radial accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(154,246,223,0.12)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Floating glyphs */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 w-12 h-12 rounded-2xl glass-card flex items-center justify-center opacity-50 hidden md:flex"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-16 right-12 w-12 h-12 rounded-2xl glass-card flex items-center justify-center opacity-50 hidden md:flex"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">key</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-16 left-16 w-12 h-12 rounded-2xl glass-card flex items-center justify-center opacity-50 hidden md:flex"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
        </motion.div>

        <div className="relative z-10 inline-flex items-center w-fit px-3 py-1 rounded-full bg-primary/10 border border-primary/20 gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
          <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
            v{VERSION}
            {detected && ` · Detected ${PLATFORM_NAMES[detected]}`}
          </span>
        </div>

        <h2 className="font-serif text-display-lg md:text-[56px] text-on-surface relative z-10 leading-tight">
          Start your private <br />
          <span className="text-primary italic">legacy</span> today.
        </h2>

        <p className="text-body-lg text-on-surface-variant max-w-xl relative z-10">
          Free. Open source. Local-only. Download once and own your AI forever.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10 pt-4">
          {PLATFORMS.map((p) => {
            const isActive = detected === p.id || (!detected && p.id === 'mac')
            return (
              <a
                key={p.id}
                href={DOWNLOADS[p.id]}
                className={
                  isActive
                    ? 'group bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-base hover:scale-[1.04] active:scale-95 transition-all mint-glow-strong flex items-center justify-center gap-3 relative'
                    : 'glass-card border-white/10 px-8 py-5 rounded-2xl font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-3 relative'
                }
              >
                <span
                  className={`material-symbols-outlined ${p.icon === 'download' ? 'filled' : ''} text-[20px]`}
                >
                  {p.icon}
                </span>
                {p.label}
                {isActive && (
                  <span className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-on-primary text-primary text-[9px] font-mono uppercase tracking-widest font-bold border border-primary/40">
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse-dot" />
                    Your OS
                  </span>
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-6 mt-4 text-on-surface/40 text-xs font-mono relative z-10">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Open Source
          </span>
          <span>·</span>
          <a
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <GitHubMark />
            View on GitHub
          </a>
          <span>·</span>
          <span>Apache 2.0</span>
        </div>
      </motion.div>
    </section>
  )
}

function GitHubMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38s1.95.13 2.86.38c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}
