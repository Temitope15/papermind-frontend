'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '1',
    icon: 'upload_file',
    title: 'Drop any PDF',
    desc: 'Drag documents directly into the local workspace. No uploads, no waiting, no queues.',
  },
  {
    n: '2',
    icon: 'auto_awesome',
    title: 'Plain explanation',
    desc: 'Our offline LLM breaks down complex jargon into human terms instantly — read aloud in your language.',
  },
  {
    n: '3',
    icon: 'all_inclusive',
    title: 'Secure forever',
    desc: 'Seal your most important files into a vault that only your loved ones can open — together.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad-y section-pad-x bg-surface-container relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15 -z-10" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[180px] -z-10" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-md mb-24"
        >
          <div className="inline-flex items-center w-fit px-3 py-1 rounded-full glass-panel gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[14px]">route</span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              The Process
            </span>
          </div>
          <h2 className="heading-display text-on-surface">
            How it <span className="text-primary italic">works.</span>
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl">
            Three steps. No cloud. Forever yours.
          </p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8">
          {/* Connecting line — draws and pulses to link the three step circles */}
          <svg
            className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-[3px] z-0 pointer-events-none overflow-visible"
            viewBox="0 0 100 3"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Dashed base track */}
            <line
              x1="0"
              y1="1.5"
              x2="100"
              y2="1.5"
              stroke="rgba(96,165,250,0.15)"
              strokeWidth="0.4"
              strokeDasharray="1.5 1.5"
              vectorEffect="non-scaling-stroke"
            />

            {/* Glowing draw animation */}
            <motion.line
              x1="0"
              y1="1.5"
              x2="100"
              y2="1.5"
              stroke="url(#line-gradient)"
              strokeWidth="0.7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ filter: 'drop-shadow(0 0 4px rgba(96,165,250,0.6))' }}
            />

            {/* Traveling pulse */}
            <motion.circle
              cy="1.5"
              r="0.9"
              fill="#60a5fa"
              initial={{ cx: 0, opacity: 0 }}
              whileInView={{ cx: [0, 100], opacity: [0, 1, 1, 0] }}
              viewport={{ once: false }}
              transition={{
                duration: 3,
                delay: 1.8,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: 'easeInOut',
                times: [0, 0.05, 0.95, 1],
              }}
              style={{ filter: 'drop-shadow(0 0 3px #60a5fa)' }}
            />
          </svg>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center flex-1 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-20 h-20 rounded-full glass-card border-primary/30 flex items-center justify-center text-primary font-serif mb-8 shadow-lg shadow-primary/5 group-hover:scale-110 group-hover:border-primary/60 transition-all duration-500 bg-surface-container-low">
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center font-mono">
                    {step.n}
                  </span>
                  <span className="material-symbols-outlined text-[32px] text-primary">
                    {step.icon}
                  </span>
                </div>
              </div>

              <div className="glass-card p-8 rounded-[32px] border-white/5 group-hover:border-primary/20 transition-all duration-500 w-full">
                <h4 className="text-headline-md font-serif mb-3">{step.title}</h4>
                <p className="text-on-surface-variant leading-relaxed text-body-md">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
