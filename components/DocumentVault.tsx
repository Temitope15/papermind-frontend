'use client'

import { motion } from 'framer-motion'

export function DocumentVault() {
  return (
    <section
      id="document-vault"
      className="section-pad-y section-pad-x relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/[0.02] -z-10" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[180px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-2xl relative">
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
              all_inclusive
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              Legacy Vault
            </span>
          </div>

          <h2 className="heading-display text-on-surface">
            A legacy that{' '}
            <span className="text-primary italic">lives on.</span>
          </h2>

          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-md">
            Our <span className="text-primary font-medium">Living Letter</span> technology
            turns the AI&apos;s explanation into a warm, first-person message from you
            — recorded in your chosen voice, sealed forever, and unlocked only by
            the people you choose.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FeaturePill
              icon="lock_person"
              title="Heir-Only Access"
              desc="Shamir's Secret Sharing — your family unlocks together."
            />
            <FeaturePill
              icon="schedule"
              title="Dead Man's Switch"
              desc="Solana-backed check-in. Activates only when needed."
            />
            <FeaturePill
              icon="record_voice_over"
              title="Voice Preserved"
              desc="TTS captures your message in 6 languages."
            />
            <FeaturePill
              icon="shield_lock"
              title="AES-256-GCM"
              desc="The same standard banks use. Local key only."
            />
          </div>
        </motion.div>

        {/* Living Letter card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="lg:w-1/2 relative"
        >
          <div className="absolute -inset-10 bg-primary/15 blur-[80px] rounded-full -z-10 animate-pulse-glow" />

          <div className="relative z-10 glass-panel p-5 sm:p-10 rounded-[32px] sm:rounded-[48px] transition-all duration-700 shadow-2xl">
            {/* Mock document background */}
            <div className="bg-surface-container-highest rounded-[20px] sm:rounded-[32px] overflow-hidden relative group">
              <div className="aspect-[4/5] sm:aspect-[5/6] relative">
                {/* Texture background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-surface-container-high to-surface-container-low" />
                <div className="absolute inset-0 noise-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(154,246,223,0.15),transparent_50%)]" />

                {/* Letter envelope visual */}
                <div className="absolute inset-x-8 top-8 bottom-32 bg-gradient-to-b from-amber-50/5 to-amber-50/[0.02] rounded-2xl border border-white/10 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary/80">
                      Sealed · 2026
                    </span>
                    <span className="material-symbols-outlined text-primary/50 text-[14px]">
                      lock
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/8 rounded-full" />
                    <div className="h-2 w-5/6 bg-white/8 rounded-full" />
                    <div className="h-2 w-full bg-white/6 rounded-full" />
                    <div className="h-2 w-3/4 bg-white/6 rounded-full" />
                    <div className="h-2 w-full bg-white/5 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                  </div>
                </div>

                {/* Centered floating quote card */}
                <div className="absolute inset-0 flex items-center justify-center px-8">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="glass-card border-primary/20 rounded-3xl p-7 max-w-sm shadow-2xl backdrop-blur-2xl"
                  >
                    <div className="flex items-center gap-2 mb-4 text-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        format_quote
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                        Living Letter
                      </span>
                    </div>
                    <p className="font-serif italic text-on-surface text-lg leading-relaxed">
                      &ldquo;To my dearest children, this is what the foundation
                      really means to our family&hellip;&rdquo;
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/8">
                      <button className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                        <span className="material-symbols-outlined text-[16px]">
                          play_circle
                        </span>
                        Listen
                      </button>
                      <span className="text-[10px] text-on-surface/40 font-mono">
                        Locked · 2 of 3
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom wax-seal style indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md">
                  <span className="material-symbols-outlined text-primary text-[14px]">
                    verified
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                    Registered on Solana
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturePill({
  icon,
  title,
  desc,
}: {
  icon: string
  title: string
  desc: string
}) {
  return (
    <div className="glass-card rounded-2xl p-4 hover:border-primary/30 transition-all group">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-primary text-[18px] group-hover:scale-110 transition-transform">
          {icon}
        </span>
        <h4 className="font-semibold text-sm text-on-surface">{title}</h4>
      </div>
      <p className="text-xs text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  )
}
