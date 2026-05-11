import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageShell, Section, Pill } from '@/components/legal/PageShell'
import { REPO, VERSION } from '@/lib/downloads'

export const metadata: Metadata = {
  title: 'Docs — PaperMind',
  description:
    'Technical documentation for PaperMind: how the offline AI pipeline, Legacy Vault, and Solana attestation work — and how to build it from source.',
}

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <PageShell
        eyebrow="Technical Docs"
        title="How PaperMind works, under the hood."
        subtitle="A walk-through of the local AI pipeline, the cryptographic vault, the Solana attestation layer, and the tradeoffs we made building it."
        updated={`v${VERSION} · May 11, 2026`}
      >
        {/* What is PaperMind */}
        <Section number="01" title="What is PaperMind?">
          <p>
            PaperMind is a private AI app for the documents you can&apos;t put
            in a cloud chatbot — contracts, prescriptions, wills, insurance
            policies, foreign-language certificates, financial disclosures.
            It reads them, translates them, explains them in plain language,
            and reads the result aloud. Everything happens on your own
            computer.
          </p>
          <p>
            It also lets you do something most apps can&apos;t: leave a
            cryptographic <em>Legacy Vault</em> behind — a sealed bundle of
            documents and personal letters that only the people you choose
            can open, together, in the future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <FeatureCard
              icon="auto_awesome"
              title="Explain"
              text="Drop in any PDF or image. PaperMind extracts the text and rewrites it as a short, plain-language summary."
            />
            <FeatureCard
              icon="translate"
              title="Translate"
              text="Six languages, bidirectional, offline. Sensitive foreign documents never touch a cloud server."
            />
            <FeatureCard
              icon="enhanced_encryption"
              title="Preserve"
              text="Seal documents into an encrypted vault that opens only when a chosen quorum of loved ones come together."
            />
          </div>

          <p className="pt-4">
            Built for people who care that &ldquo;private&rdquo; means private:
            no account, no upload, no telemetry, no fine print. The whole
            application is open source under Apache 2.0 — every claim on this
            page is verifiable in the codebase.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            <Pill>100% Offline</Pill>
            <Pill>No Account</Pill>
            <Pill>No Tracking</Pill>
            <Pill>Open Source</Pill>
            <Pill>Apache 2.0</Pill>
          </div>
        </Section>

        {/* TL;DR */}
        <Section number="02" title="TL;DR for engineers">
          <p>
            PaperMind is an Electron desktop app. Every model — OCR, neural
            machine translation, the LLM, and TTS — runs locally through the
            Tether QVAC SDK. Documents are processed in-memory; outputs are
            written only to a workspace folder you choose. An optional Legacy
            Vault encrypts a document bundle with AES-256-GCM, splits the key
            via Shamir&apos;s Secret Sharing, and anchors a content hash to
            the Solana devnet for tamper-evidence.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Pill>Electron</Pill>
            <Pill>QVAC SDK</Pill>
            <Pill>Llama 3.2 1B Q4</Pill>
            <Pill>Bergamot NMT</Pill>
            <Pill>Supertonic2 TTS</Pill>
            <Pill>AES-256-GCM</Pill>
            <Pill>Shamir SSS</Pill>
            <Pill>Solana devnet</Pill>
          </div>
        </Section>

        {/* Architecture */}
        <Section number="03" title="Architecture at a glance">
          <p>
            The app is split across the standard Electron processes: a Node
            main process owns model loading and pipeline orchestration; a
            React + Tailwind renderer drives the UI; and a contextBridge
            preload script narrows the IPC surface. There is no PaperMind
            server, no remote inference, and no background telemetry.
          </p>

          <ArchitectureDiagram />
        </Section>

        {/* AI Pipeline */}
        <Section number="04" title="The document pipeline">
          <p>
            Every document — PNG, JPG, WebP, or multi-page PDF — flows through
            the same four stages. PDFs are rasterized at 2× scale on the
            renderer canvas before reaching the OCR step.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <PipelineCard
              step="1"
              title="OCR"
              detail="QVAC ocr() with the OCR Latin Recognizer 1 model. Pages are processed individually and concatenated. Output is raw text with paragraph breaks preserved."
            />
            <PipelineCard
              step="2"
              title="Translation"
              detail="QVAC translate() using Bergamot bidirectional pairs across EN/FR/ES/DE/IT/PT. Skipped when source equals target. Runs in a Web Worker — never on the main thread."
            />
            <PipelineCard
              step="3"
              title="Explanation"
              detail="QVAC completion() against Llama 3.2 1B Q4. The system prompt constrains the model to plain spoken language in the target locale, ≤5 sentences, no markdown."
            />
            <PipelineCard
              step="4"
              title="Voice"
              detail="QVAC textToSpeech() using Supertonic2 in multilingual mode with English fallback. Output is WAV-wrapped 44.1 kHz mono ready for the in-app player."
            />
          </div>

          <p className="pt-2">
            Each stage degrades gracefully. OCR errors surface a human-readable
            message; TTS failure is non-fatal and the text result still
            renders; translation is skipped when the language pair is
            unavailable rather than blocking the rest of the pipeline.
          </p>
        </Section>

        {/* Legacy Vault */}
        <Section number="05" title="The Legacy Vault">
          <p>
            The Vault is an opt-in cryptographic container that bundles one or
            more processed documents into a single portable file. Sealing is
            deliberately multi-step.
          </p>

          <ol className="list-decimal pl-6 space-y-3 marker:text-primary marker:font-bold">
            <li>
              <strong className="text-on-surface">Living Letter generation.</strong>{' '}
              A second LLM pass produces a first-person, ≤180-word letter per
              document. The system prompt is selected by document type — will,
              insurance, medication, property, financial, emergency, other —
              so the voice stays consistent with what the document is.
            </li>
            <li>
              <strong className="text-on-surface">TTS rendering.</strong> Each
              Living Letter is synthesized and embedded as base64 audio inside
              the vault bundle. Audio is optional — large vaults can opt out.
            </li>
            <li>
              <strong className="text-on-surface">Encryption.</strong> The
              bundle (JSON) is encrypted with AES-256-GCM using a freshly
              generated 32-byte key and 12-byte IV. The auth tag is stored
              alongside the ciphertext.
            </li>
            <li>
              <strong className="text-on-surface">Key splitting.</strong> The
              32-byte AES key is fed into Shamir&apos;s Secret Sharing with a
              configurable K-of-N threshold (default 2-of-3). Each share is
              presented as a hex string in 4-character groups and as a QR
              code.
            </li>
            <li>
              <strong className="text-on-surface">Distribution.</strong> The
              owner exports the encrypted vault file and physically delivers
              shares to beneficiaries. PaperMind never sees any of it.
            </li>
          </ol>

          <p className="pt-2">
            Unlock is the reverse: import the vault file, two or more
            beneficiaries enter their shares, the AES key is reconstructed via{' '}
            <code className="font-mono text-primary text-[13px] px-1.5 py-0.5 rounded bg-primary/10">
              shamirs-secret-sharing
            </code>
            &apos;s <code className="font-mono text-primary text-[13px] px-1.5 py-0.5 rounded bg-primary/10">combine()</code>, the bundle is decrypted, and
            the Living Letters fade in one card at a time.
          </p>
        </Section>

        {/* Solana */}
        <Section number="06" title="Solana attestation (optional)">
          <p>
            Vaults can be anchored to the Solana devnet for tamper-evidence.
            We use the Memo program (
            <code className="font-mono text-primary text-[12px] px-1.5 py-0.5 rounded bg-primary/10">
              MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr
            </code>
            ) rather than a custom Anchor program — it&apos;s a no-op that
            records arbitrary bytes in a transaction, which is exactly the
            attestation surface we need.
          </p>

          <p>
            A locally-generated Ed25519 keypair lives in your workspace and is
            auto-funded by the devnet faucet when its balance drops below
            0.001 SOL. Three message types are emitted:
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <code className="font-mono text-primary text-[12px] px-1.5 py-0.5 rounded bg-primary/10 shrink-0">vault_seal</code>
              <span>Recorded at seal time. Contains the vault ID, threshold metadata, and a SHA-256 fingerprint of the encrypted bundle.</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="font-mono text-primary text-[12px] px-1.5 py-0.5 rounded bg-primary/10 shrink-0">vault_checkin</code>
              <span>An &ldquo;I&apos;m alive&rdquo; ping. Resets the dead-man&apos;s-switch clock for beneficiaries who are watching.</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="font-mono text-primary text-[12px] px-1.5 py-0.5 rounded bg-primary/10 shrink-0">vault_active</code>
              <span>Recorded when a beneficiary group reaches threshold and unlocks the vault.</span>
            </li>
          </ul>

          <p className="pt-2">
            Memos contain only hashes, IDs, and counts. <strong className="text-on-surface">No document content,
            no personal data, no key material ever touches the chain.</strong> Solana
            failures never block sealing or unlocking; on-chain attestation is
            best-effort by design.
          </p>
        </Section>

        {/* Security */}
        <Section number="07" title="Security model">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-on-surface/60 border-b border-white/10">
                <th className="py-3 pr-4 font-bold text-on-surface text-xs uppercase tracking-widest">Domain</th>
                <th className="py-3 font-bold text-on-surface text-xs uppercase tracking-widest">Guarantee</th>
              </tr>
            </thead>
            <tbody className="text-on-surface-variant">
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-bold text-on-surface">Inference</td>
                <td className="py-3">Zero outbound network calls during document processing. Verifiable with any OS-level network monitor.</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-bold text-on-surface">On-chain privacy</td>
                <td className="py-3">Solana payloads carry only hashes, vault IDs, and threshold counts.</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-bold text-on-surface">Symmetric crypto</td>
                <td className="py-3">AES-256-GCM via Node&apos;s built-in <code className="font-mono text-primary text-[12px]">crypto</code>. Random key + IV per seal.</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-bold text-on-surface">Secret splitting</td>
                <td className="py-3">Shamir&apos;s Secret Sharing over GF(2⁸) with 128-bit padding.</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-bold text-on-surface">Auditability</td>
                <td className="py-3">Seal emits a SHA-256 fingerprint that matches the Solana Memo payload.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-on-surface">Determinism</td>
                <td className="py-3">Unlock is deterministic given correct shares. LLM outputs are non-deterministic (temp 0.4) — accepted product behavior.</td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* Stack */}
        <Section number="08" title="Stack & key dependencies">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STACK.map((row) => (
              <div
                key={row.layer}
                className="glass-card rounded-2xl p-5 border-white/5 flex flex-col gap-1"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary/80">
                  {row.layer}
                </span>
                <span className="text-on-surface font-semibold">{row.tech}</span>
                <span className="text-on-surface-variant text-sm leading-relaxed">
                  {row.note}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Build from source */}
        <Section number="09" title="Build from source">
          <p>
            PaperMind is Apache 2.0. You can verify everything on this page by
            cloning, auditing, and running the code yourself.
          </p>

          <pre className="bg-surface-container-lowest border border-white/5 rounded-2xl p-5 overflow-x-auto text-[12px] font-mono text-on-surface/80 leading-relaxed">
{`# Clone
git clone https://github.com/${REPO}.git
cd papermind

# Install
npm install

# Run in dev (Electron + Vite HMR)
npm run dev

# Package a distributable binary
npm run build
npm run package`}
          </pre>

          <p>
            On first launch the app will prompt you to download the model
            weights from their original public hosts (Hugging Face, GitHub
            Releases). Total cold install footprint is under 1 GB.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`https://github.com/${REPO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card border-white/10 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2 hover:border-primary/30"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              View on GitHub
            </a>
            <a
              href={`https://github.com/${REPO}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card border-white/10 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2 hover:border-primary/30"
            >
              <span className="material-symbols-outlined text-[18px]">bug_report</span>
              Report an Issue
            </a>
          </div>
        </Section>

        {/* Glossary */}
        <Section number="10" title="Glossary">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="flex flex-col gap-1">
                <dt className="text-primary font-bold text-sm uppercase tracking-widest font-mono">
                  {g.term}
                </dt>
                <dd className="text-on-surface-variant leading-relaxed text-sm">
                  {g.def}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </PageShell>
      <Footer />
    </>
  )
}

function PipelineCard({
  step,
  title,
  detail,
}: {
  step: string
  title: string
  detail: string
}) {
  return (
    <div className="glass-card rounded-2xl p-5 border-white/5 flex flex-col gap-2 relative">
      <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-mono font-bold flex items-center justify-center">
        {step}
      </span>
      <h4 className="font-serif text-xl text-on-surface pr-10">{title}</h4>
      <p className="text-on-surface-variant text-sm leading-relaxed">{detail}</p>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string
  title: string
  text: string
}) {
  return (
    <div className="glass-card rounded-2xl p-5 border-white/5 flex flex-col gap-3 relative overflow-hidden group hover:border-primary/30 transition-all">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center relative z-10">
        <span className="material-symbols-outlined text-primary text-[22px]">{icon}</span>
      </div>
      <h4 className="font-serif text-lg text-on-surface relative z-10">{title}</h4>
      <p className="text-on-surface-variant text-sm leading-relaxed relative z-10">
        {text}
      </p>
    </div>
  )
}

const MAIN_MODULES = [
  { name: 'qvac.ts', note: 'model loading hub', icon: 'memory' },
  { name: 'ocr.ts', note: 'QVAC ocr() wrapper', icon: 'text_fields' },
  { name: 'translate.ts', note: 'Bergamot NMT', icon: 'translate' },
  { name: 'explain.ts', note: 'plain-language prompt', icon: 'auto_awesome' },
  { name: 'living-letter.ts', note: 'per-doc-type prompt', icon: 'mail' },
  { name: 'speak.ts', note: 'Supertonic2 + WAV', icon: 'graphic_eq' },
  { name: 'vault.ts', note: 'AES-256-GCM + SSS', icon: 'enhanced_encryption' },
  { name: 'solana.ts', note: 'devnet Memo', icon: 'link' },
]

const RENDERER_MODULES = [
  { name: 'pdfToImages.ts', note: 'pdfjs canvas raster', icon: 'picture_as_pdf' },
  { name: 'Home', note: 'drop & process', icon: 'upload_file' },
  { name: 'Result', note: 'read & listen', icon: 'menu_book' },
  { name: 'Vault', note: 'seal & shares', icon: 'lock' },
  { name: 'Unlock', note: 'reveal letters', icon: 'key' },
]

function ArchitectureDiagram() {
  return (
    <div className="relative mt-4 flex flex-col gap-0">
      {/* Main process tier */}
      <ProcessTier
        eyebrow="Main Process · Node"
        title="Pipeline orchestration & model loading"
        modules={MAIN_MODULES}
        accent="primary"
        footer={
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-primary/15 mt-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary/70">
              IPC channels
            </span>
            {['ai:*', 'vault:*', 'solana:*'].map((ch) => (
              <code
                key={ch}
                className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary"
              >
                {ch}
              </code>
            ))}
          </div>
        }
      />

      {/* Bridge */}
      <div className="flex flex-col items-center -my-px relative z-10">
        <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-primary/10" />
        <div className="px-3 py-1.5 rounded-full glass-panel border-primary/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[14px]">
            sync_alt
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
            contextBridge
          </span>
        </div>
        <div className="w-px h-6 bg-gradient-to-t from-primary/40 to-primary/10" />
      </div>

      {/* Renderer tier */}
      <ProcessTier
        eyebrow="Renderer · Chromium"
        title="React + Tailwind UI"
        modules={RENDERER_MODULES}
        accent="muted"
      />
    </div>
  )
}

function ProcessTier({
  eyebrow,
  title,
  modules,
  accent,
  footer,
}: {
  eyebrow: string
  title: string
  modules: { name: string; note: string; icon: string }[]
  accent: 'primary' | 'muted'
  footer?: React.ReactNode
}) {
  const isPrimary = accent === 'primary'
  return (
    <div
      className={`glass-panel rounded-[28px] p-5 md:p-7 relative overflow-hidden ${
        isPrimary ? 'border-primary/20' : 'border-white/10'
      }`}
    >
      <div
        className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[120px] ${
          isPrimary ? 'bg-primary/10' : 'bg-white/5'
        }`}
      />

      <div className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex flex-col gap-1">
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
              isPrimary ? 'text-primary' : 'text-on-surface/50'
            }`}
          >
            {eyebrow}
          </span>
          <span className="font-serif text-base text-on-surface">{title}</span>
        </div>
        <span
          className={`hidden sm:inline-flex w-9 h-9 rounded-xl items-center justify-center border ${
            isPrimary
              ? 'bg-primary/15 border-primary/30 text-primary'
              : 'bg-white/5 border-white/10 text-on-surface/60'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isPrimary ? 'dns' : 'browser_updated'}
          </span>
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {modules.map((m) => (
          <div
            key={m.name}
            className={`rounded-xl px-3 py-2.5 border flex flex-col gap-0.5 transition-all hover:scale-[1.03] ${
              isPrimary
                ? 'bg-surface-container/80 border-primary/15 hover:border-primary/40'
                : 'bg-surface-container/60 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`material-symbols-outlined text-[14px] ${
                  isPrimary ? 'text-primary' : 'text-on-surface/60'
                }`}
              >
                {m.icon}
              </span>
              <code className="font-mono text-[12px] font-bold text-on-surface tracking-tight truncate">
                {m.name}
              </code>
            </div>
            <span className="text-[10.5px] text-on-surface-variant leading-snug">
              {m.note}
            </span>
          </div>
        ))}
      </div>

      {footer && <div className="relative z-10">{footer}</div>}
    </div>
  )
}

const STACK = [
  {
    layer: 'Shell',
    tech: 'Electron + electron-vite',
    note: 'Cross-platform desktop without abandoning the familiar web stack.',
  },
  {
    layer: 'Renderer',
    tech: 'React 18 + Tailwind',
    note: 'Pages: Home (drop), Result (read), Vault (seal), Unlock (reveal).',
  },
  {
    layer: 'AI',
    tech: 'Tether QVAC SDK',
    note: 'Single SDK surface for LLM, OCR, NMT, and TTS. No custom model serving.',
  },
  {
    layer: 'LLM',
    tech: 'Llama 3.2 1B Q4',
    note: 'Two passes per vaulted document — clinical explanation + Living Letter.',
  },
  {
    layer: 'OCR',
    tech: 'OCR Latin Recognizer 1',
    note: 'Page-by-page text extraction with paragraph layout preserved.',
  },
  {
    layer: 'NMT',
    tech: 'Bergamot bidirectional',
    note: 'EN ↔ FR / ES / DE / IT / PT. Skipped when source equals target.',
  },
  {
    layer: 'TTS',
    tech: 'Supertonic2',
    note: 'Multilingual synthesis with English-only fallback. WAV output.',
  },
  {
    layer: 'Crypto',
    tech: 'Node crypto + shamirs-secret-sharing',
    note: 'AES-256-GCM for the bundle, SSS for K-of-N key fragments.',
  },
  {
    layer: 'PDF',
    tech: 'pdfjs-dist',
    note: 'Pages rasterized to canvas at 2× scale, exported as PNG buffers.',
  },
  {
    layer: 'Chain',
    tech: 'Solana web3.js (devnet)',
    note: 'Memo program transactions. Auto-funded keypair, hash-only payloads.',
  },
]

const GLOSSARY = [
  {
    term: 'QVAC',
    def: "Quantum Vector AI Compute — Tether's local-first AI SDK shipping LLM, OCR, NMT, and TTS in a single API surface.",
  },
  {
    term: 'Living Letter',
    def: 'A warm first-person LLM output written as if the document owner is speaking, generated at vault-seal time.',
  },
  {
    term: 'Shamir SSS',
    def: 'A cryptographic scheme that splits a secret into N shares such that any K reconstruct it; fewer than K reveal nothing.',
  },
  {
    term: 'AES-256-GCM',
    def: 'Authenticated symmetric encryption used to encrypt the vault bundle with integrity protection.',
  },
  {
    term: 'Memo program',
    def: 'A no-op Solana program that records arbitrary data in a transaction — perfect for attestation.',
  },
  {
    term: "Dead Man's Switch",
    def: 'A periodic check-in mechanism that signals beneficiaries when the owner has stopped responding for a configurable period.',
  },
]
