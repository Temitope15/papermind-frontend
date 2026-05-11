'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const POINTS = [
  { icon: 'check_circle', label: 'Instant summary of obligations' },
  { icon: 'check_circle', label: 'Hidden fee identification' },
  { icon: 'check_circle', label: 'No-nonsense risk assessment' },
  { icon: 'check_circle', label: 'Translates 6 languages locally' },
]

const EXPLANATION_LINES = [
  {
    label: 'Obligation',
    text: 'You agree to a 24-month minimum term with auto-renewal.',
  },
  {
    label: 'Hidden Fee',
    text: '$249 early-termination penalty applies if cancelled before month 24.',
  },
  {
    label: 'Liability',
    text: 'Provider is not liable for data loss exceeding $50.',
  },
  {
    label: 'Risk',
    text: 'Arbitration clause waives your right to a jury trial.',
  },
]

function useTypewriter(text: string, speed: number, startDelay: number, trigger: boolean) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!trigger) return
    setDisplayed('')
    let cancelled = false
    const start = window.setTimeout(() => {
      let i = 0
      const tick = () => {
        if (cancelled) return
        i += 1
        setDisplayed(text.slice(0, i))
        if (i < text.length) {
          window.setTimeout(tick, speed)
        }
      }
      tick()
    }, startDelay)
    return () => {
      cancelled = true
      window.clearTimeout(start)
    }
  }, [text, speed, startDelay, trigger])

  return displayed
}

export function AIExplainer() {
  return (
    <section
      id="ai-explainer"
      className="section-pad-y section-pad-x bg-surface-container-low relative overflow-hidden"
    >
      <div className="absolute inset-0 dotted-bg opacity-30 -z-10" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-2xl relative">
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
              auto_awesome
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              The Explainer
            </span>
          </div>

          <h2 className="heading-display text-on-surface">
            Complex documents,{' '}
            <span className="text-primary italic">simple words.</span>
          </h2>

          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-md">
            Legal jargon and technical fine print can be overwhelming. Our local
            AI reads every line so you don&apos;t have to, translating complex
            clauses into clear, actionable plain language.
          </p>

          <div className="flex flex-col gap-1 mt-6">
            {POINTS.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="flex items-center gap-4 py-3 border-b border-white/5"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">
                  {point.icon}
                </span>
                <span className="text-on-surface">{point.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated mock UI */}
        <ExplainerVisual />
      </div>
    </section>
  )
}

function ExplainerVisual() {
  const [inView, setInView] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="lg:w-1/2 relative"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/15 blur-3xl animate-pulse-glow" />

      <div className="relative z-10 glass-panel p-4 sm:p-8 rounded-[32px] sm:rounded-[48px] animate-float">
        <div className="bg-surface-container-highest rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 flex flex-col gap-5 shadow-inner relative overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">
                auto_awesome
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface">
                Legal_Contract.pdf
              </span>
              <span className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest">
                Plain-language summary
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">
                Streaming
              </span>
            </div>
          </div>

          {/* Explained lines */}
          <div className="space-y-4">
            {EXPLANATION_LINES.map((line, i) => (
              <ExplainerLine
                key={line.label}
                label={line.label}
                text={line.text}
                index={i}
                trigger={inView}
              />
            ))}

            {/* Streaming cursor row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 6.5, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-primary/60 mt-2" />
              <p className="text-[12px] text-on-surface/50 italic font-mono leading-relaxed flex items-center gap-1">
                Analyzing next clause
                <span className="cursor-stream" />
              </p>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
            <span className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest">
              Llama 3.2 · 1B · Q4
            </span>
            <span className="text-[10px] font-mono text-primary/80 uppercase tracking-widest">
              100% Local
            </span>
          </div>

          {/* Scan line decoration */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  )
}

function ExplainerLine({
  label,
  text,
  index,
  trigger,
}: {
  label: string
  text: string
  index: number
  trigger: boolean
}) {
  const startDelay = 600 + index * 1300
  const typed = useTypewriter(text, 22, startDelay, trigger)
  const done = typed.length === text.length

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: trigger ? 1 : 0, x: trigger ? 0 : -10 }}
      transition={{ delay: startDelay / 1000 - 0.2, duration: 0.4 }}
      className="flex items-start gap-3"
    >
      <div
        className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
          done ? 'bg-primary shadow-[0_0_8px_#60a5fa]' : 'bg-primary/50'
        }`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-primary/80">
            {label}
          </span>
        </div>
        <p className="text-[13px] leading-snug text-on-surface/90 font-medium">
          {typed}
          {!done && trigger && <span className="cursor-stream" />}
        </p>
      </div>
    </motion.div>
  )
}
