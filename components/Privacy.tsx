'use client'

import { motion } from 'framer-motion'

export function Privacy() {
  return (
    <section id="privacy" className="section-pad-y section-pad-x bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute inset-0 dotted-bg opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-md mb-2xl"
        >
          <div className="inline-flex items-center w-fit px-3 py-1 rounded-full glass-panel gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[14px]">shield</span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              Privacy Promise
            </span>
          </div>

          <h2 className="heading-display text-on-surface">
            <span className="text-primary italic">100%</span> private. <span className="text-primary italic">0%</span> cloud.
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            PaperMind runs entirely on your computer. Your medical records, legal
            contracts, and personal letters never leave your desk. We don&apos;t
            just protect your privacy — we make it local.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <PrivacyCard
            icon="lan"
            title="Air-Gapped AI"
            desc="The AI model is downloaded once and lives on your SSD. It works even when your Wi-Fi is off."
            delay={0}
          />
          <PrivacyCardHero
            icon="shield_person"
            title="Zero Data Tracking"
            subtitle="Verified Local Host"
            delay={0.15}
          />
          <PrivacyCard
            icon="vpn_key"
            title="Self-Sovereign"
            desc="Documents are encrypted with keys you alone control. No master keys, no backdoors, no cloud."
            delay={0.3}
          />
        </div>

        {/* Audit footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: 'Outbound Calls', value: '0' },
            { label: 'Cookies', value: 'None' },
            { label: 'Telemetry', value: 'None' },
            { label: 'Encryption', value: 'AES-256' },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card rounded-2xl px-4 py-3 flex flex-col items-center gap-1"
            >
              <span className="text-primary font-serif text-2xl">{item.value}</span>
              <span className="text-[9px] uppercase tracking-widest text-on-surface/40 font-mono">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PrivacyCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: string
  title: string
  desc: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-xl rounded-[32px] flex flex-col gap-lg border-white/5 hover:border-primary/30 transition-all duration-500 group cursor-default"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
        <span className="material-symbols-outlined text-primary text-[28px]">{icon}</span>
      </div>
      <h3 className="font-serif text-headline-md">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function PrivacyCardHero({
  icon,
  title,
  subtitle,
  delay,
}: {
  icon: string
  title: string
  subtitle: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel p-xl rounded-[32px] flex flex-col items-center justify-center gap-lg border-primary/30 relative overflow-hidden group cursor-default mint-glow"
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent_70%)]" />

      <motion.span
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="material-symbols-outlined filled text-[80px] text-primary relative z-10"
      >
        {icon}
      </motion.span>
      <div className="text-center relative z-10">
        <p className="text-headline-md font-serif text-on-surface">{title}</p>
        <span className="text-label-md text-primary font-bold uppercase tracking-widest mt-sm block">
          {subtitle}
        </span>
      </div>
    </motion.div>
  )
}
