'use client'

import { motion } from 'framer-motion'
import { DOWNLOADS, VERSION, type Platform } from '@/lib/downloads'
import { useDetectedOS } from '@/lib/useDetectedOS'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

const PLATFORM_LABEL: Record<Platform, string> = {
  mac: 'Download for Mac',
  windows: 'Download for Windows',
  linux: 'Download for Linux',
}

export function Hero() {
  const detected = useDetectedOS()
  const primary: Platform = detected ?? 'mac'
  const others = (['mac', 'windows', 'linux'] as Platform[]).filter((p) => p !== primary)
  const iconFor = (p: Platform) => {
    if (p === 'windows') return <WindowsIcon />
    if (p === 'linux') return <LinuxIcon />
    return <span className="material-symbols-outlined text-[18px]">laptop_mac</span>
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden section-pad-x">
      {/* Atmospheric background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary/10 to-transparent animate-pulse-glow -z-10" />
      <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
      <div className="absolute top-32 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-64 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-2xl items-center relative">
        {/* Left: copy + CTAs */}
        <div className="flex flex-col gap-lg">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center w-fit px-4 py-1.5 rounded-full glass-panel gap-2"
            style={{ borderColor: 'rgba(96,165,250,0.2)' }}
          >
            <span className="material-symbols-outlined text-primary text-[16px]">encrypted</span>
            <span className="text-label-md tracking-widest uppercase font-bold text-primary">
              Privacy First AI
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="heading-hero text-on-surface max-w-xl"
          >
            Your documents, explained.
            <br className="hidden sm:block" />{' '}
            Your legacy,{' '}
            <span className="text-primary italic">preserved.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-body-lg text-on-surface-variant max-w-lg leading-relaxed"
          >
            A private AI that reads, translates, and explains your most important
            papers—entirely offline. No cloud, no leaks, just clarity.
          </motion.p>

          {/* Download Cluster */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row gap-2 w-full sm:max-w-fit">
              <a
                href={DOWNLOADS[primary]}
                className="group bg-primary text-on-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 mint-glow"
              >
                <span className="material-symbols-outlined filled text-[20px]">download</span>
                <span>{PLATFORM_LABEL[primary]}</span>
                <span className="material-symbols-outlined text-[18px] -mr-1 transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
              <div className="flex gap-2">
                {others.map((p) => (
                  <a
                    key={p}
                    href={DOWNLOADS[p]}
                    className="flex-1 sm:flex-none glass-card px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover:border-primary/30"
                  >
                    {iconFor(p)}
                    {p === 'mac' ? 'Mac' : p === 'windows' ? 'Windows' : 'Linux'}
                  </a>
                ))}
              </div>
            </div>
            <p className="text-xs text-on-surface/40 px-1 sm:px-4 font-mono leading-relaxed">
              <span className="text-primary/70">v{VERSION}</span> · Universal binary · 100% offline core
              {detected && (
                <>
                  {' · '}
                  <span className="text-primary/80">Detected {primary === 'mac' ? 'macOS' : primary === 'windows' ? 'Windows' : 'Linux'}</span>
                </>
              )}
            </p>
          </motion.div>

          {/* Trust line */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6"
          >
            <div className="flex items-center gap-2 text-xs text-on-surface/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="font-mono uppercase tracking-widest">No Cloud</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="font-mono uppercase tracking-widest">Open Source</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="font-mono uppercase tracking-widest">AES-256</span>
            </div>
          </motion.div>
        </div>

        {/* Right: animated visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="relative isolate"
        >
          {/* Atmospheric backdrop */}
          <div className="absolute -inset-12 bg-primary/15 blur-[140px] rounded-full -z-10 animate-pulse-glow" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/8 rounded-full blur-[120px] -z-10" />

          {/* Model chip — top left, floats */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="hidden sm:block absolute -top-5 -left-3 z-30"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel rounded-2xl px-3.5 py-2 backdrop-blur-2xl border-white/10 flex items-center gap-2 shadow-xl"
            >
              <span className="material-symbols-outlined filled text-primary text-[16px]">psychology</span>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-mono font-bold text-on-surface tracking-wider">Llama 3.2 · 1B</span>
                <span className="text-[8px] font-mono text-on-surface/50 uppercase tracking-widest">Quantized · Q4</span>
              </div>
            </motion.div>
          </motion.div>

          {/* On-Device pill — top right */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 glass-panel rounded-full px-3 py-1.5 flex items-center gap-2 backdrop-blur-2xl border-primary/30 z-30"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot shadow-[0_0_8px_#60a5fa]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
              On-Device
            </span>
          </motion.div>

          {/* Main document panel */}
          <div className="relative z-10 glass-panel p-4 sm:p-6 rounded-[36px] sm:rounded-[48px] animate-float shadow-2xl">
            <div className="aspect-[4/5] sm:aspect-square w-full glass-card rounded-[26px] sm:rounded-[36px] overflow-hidden relative bg-surface-container-lowest">

              {/* Soft gradient + noise + grid backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 noise-overlay" />

              {/* Document title bar */}
              <div className="absolute inset-x-0 top-0 px-5 py-4 flex items-center gap-3 border-b border-white/5 bg-surface-container/40 backdrop-blur-md z-10">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[16px]">description</span>
                </div>
                <div className="flex flex-col min-w-0 leading-tight">
                  <span className="text-[11px] font-bold text-on-surface tracking-tight truncate">
                    Legal_Contract.pdf
                  </span>
                  <span className="text-[9px] font-mono text-on-surface/40 uppercase tracking-widest">
                    Page 1 / 4 · 184 KB
                  </span>
                </div>
                <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-primary/90 flex items-center gap-1.5 shrink-0">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse-dot" />
                  Live
                </span>
              </div>

              {/* Document body — styled serif text with a highlighted clause */}
              <div className="absolute inset-x-0 top-[60px] bottom-[112px] px-5 sm:px-6 py-4 overflow-hidden">
                <div className="font-serif text-[10.5px] sm:text-[11px] leading-[1.65] text-on-surface/70 space-y-2.5">
                  <p>
                    <span className="text-on-surface/50 font-mono text-[9px] mr-1.5">§1</span>
                    WHEREAS the parties hereby enter into a binding agreement with
                    respect to the services described in <span className="italic">Schedule A</span>.
                  </p>
                  <p>
                    The Subscriber shall provide a minimum twenty-four (24) month
                    term, with automatic renewal unless written notice is given.
                  </p>
                  <p>
                    Termination prior to the conclusion of the minimum term
                    incurs a{' '}
                    <span className="relative inline-block bg-primary/15 text-primary font-semibold not-italic rounded px-1 ring-1 ring-primary/40">
                      $249 early-termination fee
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                        className="absolute -bottom-px left-0 right-0 h-px bg-primary origin-left"
                      />
                    </span>
                    .
                  </p>
                  <p>
                    Provider shall not be liable for indirect, incidental, or
                    consequential damages in excess of fifty dollars ($50).
                  </p>
                  <p className="text-on-surface/40">
                    Any dispute arising hereunder shall be submitted to binding
                    arbitration in accordance with...
                  </p>
                </div>
              </div>

              {/* Scan line */}
              <div className="absolute inset-x-0 top-[60px] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line shadow-[0_0_12px_#60a5fa] pointer-events-none" />

              {/* Bottom UI: extraction progress */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4">
                <div className="glass-card p-3 sm:p-4 rounded-2xl border-white/15 backdrop-blur-2xl flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface/60">
                      Extracting clauses
                    </span>
                    <span className="text-[10px] font-mono font-bold text-primary">
                      74<span className="text-on-surface/40">%</span>
                    </span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '74%' }}
                      transition={{ duration: 2.2, ease: 'easeOut', delay: 1 }}
                      className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary shadow-[0_0_12px_#60a5fa]"
                    />
                  </div>
                  <p className="text-[10px] text-on-surface-variant italic font-mono leading-snug">
                    Reasoning over §3 · obligations<span className="cursor-stream" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI annotation callout — overlaps doc on the right */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-1 sm:-right-6 top-[42%] -translate-y-1/2 z-30 max-w-[230px] sm:max-w-[260px]"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel rounded-2xl p-4 backdrop-blur-2xl border-primary/30 shadow-2xl mint-glow"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined filled text-primary text-[12px]">auto_awesome</span>
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary">
                  Plain English
                </span>
                <span className="ml-auto text-[8px] font-mono text-on-surface/40 uppercase tracking-widest">
                  0.4s
                </span>
              </div>
              <p className="text-[12px] sm:text-[13px] text-on-surface leading-snug">
                Cancelling before <span className="font-semibold text-on-surface">month 24</span> costs you{' '}
                <span className="text-primary font-semibold">$249</span>.
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                <button className="text-[10px] font-mono uppercase tracking-widest text-primary/80 hover:text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined filled text-[12px]">volume_up</span>
                  Listen
                </button>
                <span className="text-[9px] font-mono text-on-surface/40">§3</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-left language chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="hidden sm:flex absolute -bottom-3 left-6 z-30"
          >
            <div className="glass-panel rounded-full px-3 py-1.5 flex items-center gap-2 backdrop-blur-2xl border-white/10 shadow-xl">
              <span className="text-[10px] font-mono font-bold text-on-surface tracking-wider">EN</span>
              <span className="material-symbols-outlined text-primary text-[12px]">sync_alt</span>
              <span className="text-[10px] font-mono font-bold text-on-surface/70 tracking-wider">DE · FR · ES</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  )
}

function LinuxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v4.5a4 4 0 0 0 .8 2.4l2.5 3.3a2 2 0 0 1 .2 2.1l-1 2a2 2 0 0 1-1.8 1.1H7.3a2 2 0 0 1-1.8-1.1l-1-2a2 2 0 0 1 .2-2.1l2.5-3.3A4 4 0 0 0 8 10.5V6a4 4 0 0 1 4-4Z" />
      <circle cx="10" cy="7.5" r="0.6" fill="currentColor" />
      <circle cx="14" cy="7.5" r="0.6" fill="currentColor" />
    </svg>
  )
}
