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
            style={{ borderColor: 'rgba(154,246,223,0.2)' }}
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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/15 blur-[120px] rounded-full scale-90 animate-pulse-glow" />
          <div className="relative z-10 glass-panel p-6 rounded-[48px] animate-float">
            <div className="aspect-square w-full glass-card rounded-[36px] overflow-hidden relative bg-surface-container-lowest">
              {/* Swirling rings */}
              <div className="absolute inset-0 opacity-50 animate-swirl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-primary/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border-[1px] border-primary/10 rounded-full border-dashed" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[1px] border-primary/5 rounded-full" />
              </div>

              {/* Center document mock */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[55%] aspect-[3/4] bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl shadow-2xl border border-white/10 p-5 overflow-hidden">
                  {/* Scan line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line shadow-[0_0_12px_#9af6df]" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/20 rounded" />
                    <div className="h-2 w-4/5 bg-white/15 rounded" />
                    <div className="h-2 w-full bg-white/15 rounded" />
                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-5/6 bg-white/10 rounded" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-2/3 bg-primary/40 rounded" />
                    <div className="h-2 w-full bg-primary/20 rounded" />
                  </div>
                </div>
              </div>

              {/* Bottom UI overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-4 rounded-2xl flex flex-col gap-3 border-white/20 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          description
                        </span>
                      </div>
                      <span className="text-xs font-bold text-on-surface tracking-tight">
                        Legal_Contract.pdf
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
                      Analyzing
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '74%' }}
                      transition={{ duration: 2.2, ease: 'easeOut', delay: 1 }}
                      className="h-full bg-primary shadow-[0_0_15px_#9af6df]"
                    />
                  </div>
                  <p className="text-[10px] text-on-surface-variant italic font-mono leading-snug">
                    Extracting confidential clauses via Local LLM<span className="cursor-stream" />
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge: on-device */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -top-4 -right-4 glass-panel rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-2xl border-primary/30"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot shadow-[0_0_8px_#9af6df]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                On-Device
              </span>
            </motion.div>
          </div>
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
