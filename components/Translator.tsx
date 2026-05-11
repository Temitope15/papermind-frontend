'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const STATS = [
  { value: '100%', label: 'Air-Gapped' },
  { value: '6', label: 'Languages' },
  { value: '0ms', label: 'Cloud Latency' },
]

const LANGUAGES = ['EN', 'FR', 'ES', 'DE', 'IT', 'PT']

const SAMPLE = {
  source: {
    code: 'DE',
    title: 'Geburtsurkunde · Auszug',
    body: [
      'Hiermit wird bestätigt, dass das Kind',
      'Anna Maria Becker',
      'am 14. März 1991 in München geboren wurde.',
      'Eltern: Klaus Becker und Sophie Becker, geb. Lang.',
      'Eingetragen im Geburtenregister Nr. 4821 / 1991.',
    ],
  },
  target: {
    code: 'EN',
    title: 'Birth Certificate · Excerpt',
    body: [
      'It is hereby certified that the child',
      'Anna Maria Becker',
      'was born on 14 March 1991 in Munich.',
      'Parents: Klaus Becker and Sophie Becker, née Lang.',
      'Recorded in the Register of Births No. 4821 / 1991.',
    ],
  },
}

function useTranslatorTypewriter(
  lines: string[],
  speed: number,
  startDelay: number,
  trigger: boolean,
) {
  const [progress, setProgress] = useState<number[]>(() => lines.map(() => 0))

  useEffect(() => {
    if (!trigger) return
    setProgress(lines.map(() => 0))
    let cancelled = false

    const runLine = (lineIdx: number, baseDelay: number) =>
      new Promise<void>((resolve) => {
        const tickAt = (charIdx: number) => {
          if (cancelled) return resolve()
          if (charIdx > lines[lineIdx].length) return resolve()
          setProgress((prev) => {
            const next = [...prev]
            next[lineIdx] = charIdx
            return next
          })
          window.setTimeout(() => tickAt(charIdx + 1), speed)
        }
        window.setTimeout(() => tickAt(0), baseDelay)
      })

    ;(async () => {
      await new Promise<void>((r) => window.setTimeout(r, startDelay))
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        await runLine(i, 0)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [lines, speed, startDelay, trigger])

  return progress
}

export function Translator() {
  return (
    <section
      id="secure-translator"
      className="py-32 px-margin-desktop bg-surface-container-lowest relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-20 -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-2xl relative">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 flex flex-col gap-lg"
        >
          <div className="inline-flex items-center w-fit px-3 py-1 rounded-full glass-panel gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[14px]">
              translate
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              Secure Translator
            </span>
          </div>

          <h2 className="font-serif text-display-lg text-on-surface leading-tight">
            Speak every language, <br />
            <span className="text-primary italic">privately.</span>
          </h2>

          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-md">
            Translate birth certificates, property deeds, and personal letters
            across six languages. Since it runs 100% offline, your sensitive
            foreign documents never touch a cloud server.
          </p>

          <div className="flex gap-3 mt-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                className="px-5 py-4 rounded-2xl glass-panel border-white/5 flex flex-col items-center gap-1 flex-1"
              >
                <span className="text-3xl font-serif text-primary">{stat.value}</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-on-surface/50">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {LANGUAGES.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1.5 rounded-full glass-card text-xs font-mono font-bold text-on-surface/70 tracking-wider hover:text-primary hover:border-primary/30 transition-all"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Translator visual */}
        <TranslatorVisual />
      </div>
    </section>
  )
}

function TranslatorVisual() {
  const [inView, setInView] = useState(false)
  const sourceProgress = useTranslatorTypewriter(SAMPLE.source.body, 16, 400, inView)
  const targetProgress = useTranslatorTypewriter(SAMPLE.target.body, 16, 1800, inView)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="lg:w-1/2 w-full"
    >
      <div className="glass-panel p-4 rounded-[40px] relative overflow-hidden">
        <div className="flex gap-1 min-h-[420px] relative">
          {/* Original */}
          <div className="flex-1 bg-white/[0.03] p-6 rounded-l-[32px] overflow-hidden border-r border-white/10">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[10px] font-bold text-on-surface/50 uppercase tracking-widest">
                Original
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5">
                <span className="material-symbols-outlined text-[12px] text-on-surface/50">
                  language
                </span>
                <span className="text-[9px] font-mono font-bold text-on-surface/60">
                  {SAMPLE.source.code}
                </span>
              </div>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-on-surface/40 mb-3">
              {SAMPLE.source.title}
            </p>
            <div className="space-y-2">
              {SAMPLE.source.body.map((line, i) => {
                const shown = line.slice(0, sourceProgress[i] ?? 0)
                const active = (sourceProgress[i] ?? 0) > 0 && shown.length < line.length
                return (
                  <p
                    key={i}
                    className="text-[12px] leading-snug text-on-surface/80 font-medium min-h-[1em]"
                  >
                    {shown}
                    {active && <span className="cursor-stream" />}
                  </p>
                )
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[10px] font-mono text-on-surface/30 italic leading-snug">
                &ldquo;Bergamot NMT · bidirectional · offline&rdquo;
              </p>
            </div>
          </div>

          {/* Translation */}
          <div className="flex-1 bg-primary/5 p-6 rounded-r-[32px] overflow-hidden relative">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Translation
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/15 border border-primary/20">
                <span className="material-symbols-outlined text-[12px] text-primary">
                  language
                </span>
                <span className="text-[9px] font-mono font-bold text-primary">
                  {SAMPLE.target.code}
                </span>
              </div>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-primary/60 mb-3">
              {SAMPLE.target.title}
            </p>
            <div className="space-y-2">
              {SAMPLE.target.body.map((line, i) => {
                const shown = line.slice(0, targetProgress[i] ?? 0)
                const active = (targetProgress[i] ?? 0) > 0 && shown.length < line.length
                return (
                  <p
                    key={i}
                    className="text-[12px] leading-snug text-on-surface font-medium min-h-[1em]"
                  >
                    {shown}
                    {active && <span className="cursor-stream" />}
                  </p>
                )
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-primary/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot shadow-[0_0_8px_#9af6df]" />
              <p className="text-[10px] font-mono text-primary/80 uppercase tracking-widest font-bold">
                Translated locally
              </p>
            </div>
          </div>

          {/* Center exchange icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xl mint-glow-strong"
            >
              <span className="material-symbols-outlined text-[28px]">sync_alt</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
