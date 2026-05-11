import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageShell, Section, Pill } from '@/components/legal/PageShell'

export const metadata: Metadata = {
  title: 'Privacy Policy — PaperMind',
  description:
    'PaperMind runs entirely on your device. We collect nothing, store nothing, transmit nothing. Read the full privacy commitment.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <PageShell
        eyebrow="Privacy Policy"
        title="We can't read your data. Because it never leaves your device."
        subtitle="PaperMind is built local-first. There is no PaperMind server, no analytics pipeline, no opaque cloud. This page documents — in plain English — exactly what that means for you."
        updated="May 11, 2026"
      >
        <Section number="01" title="The short version">
          <p>
            PaperMind is a desktop application that runs every model and every
            file operation on your own machine. We do not collect personal data,
            telemetry, document contents, prompts, or model outputs. There is no
            account, no login, and no server-side processing of any kind.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Pill>No telemetry</Pill>
            <Pill>No accounts</Pill>
            <Pill>No cloud inference</Pill>
            <Pill>No tracking</Pill>
            <Pill>Open source</Pill>
          </div>
        </Section>

        <Section number="02" title="What data PaperMind handles">
          <p>
            <strong className="text-on-surface">Documents you open</strong> are
            processed in memory by local models bundled with the app. Extracted
            text, embeddings, summaries, and translations are written only to
            files inside the workspace folder you choose. Nothing is uploaded.
          </p>
          <p>
            <strong className="text-on-surface">Vaults you create</strong> are
            encrypted with AES-256 keys derived from your passphrase. The
            ciphertext is stored as files in your workspace. We have no
            ability — technical or legal — to recover your data if you lose
            that passphrase.
          </p>
          <p>
            <strong className="text-on-surface">Recipient shares</strong>{' '}
            generated through the Legacy Vault are Shamir secret-shared
            fragments. They are produced locally and are only delivered to the
            recipients you explicitly choose, through channels you control.
          </p>
        </Section>

        <Section number="03" title="What we do not collect">
          <p>The following list is exhaustive — PaperMind does not collect any of it:</p>
          <ul className="list-none space-y-3 mt-2">
            {[
              'Document contents, file names, or file metadata',
              'Prompts, queries, or model outputs',
              'IP addresses, device identifiers, or geolocation',
              'Usage analytics, crash reports, or performance metrics',
              'Email addresses, names, or any other personal information',
              'Wallet addresses, transaction history, or on-chain activity',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                  close
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section number="04" title="Network activity">
          <p>
            By default, PaperMind makes no outbound network requests after
            installation. The application is fully functional offline.
          </p>
          <p>
            Three optional, user-initiated actions involve a network — each one
            is explicitly triggered by you and clearly labeled in the UI:
          </p>
          <ul className="space-y-3 mt-2">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                cloud_download
              </span>
              <span>
                <strong className="text-on-surface">Model downloads</strong> —
                the first time you choose to download a model (LLM, OCR,
                Bergamot NMT, TTS), PaperMind fetches the model weights from
                their original public hosts (e.g. Hugging Face, GitHub
                Releases). After that, models live on your disk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                system_update
              </span>
              <span>
                <strong className="text-on-surface">App updates</strong> — if
                you click &ldquo;Check for updates,&rdquo; the app contacts
                GitHub Releases to fetch the latest installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                link
              </span>
              <span>
                <strong className="text-on-surface">Solana devnet
                anchoring</strong> — vaults can be optionally anchored to the
                Solana devnet for tamper-evidence. Only a content hash and a
                public key are submitted; no document content, no personal
                data.
              </span>
            </li>
          </ul>
        </Section>

        <Section number="05" title="This website">
          <p>
            The marketing site you are reading right now is static HTML and CSS
            served from a CDN. It does not use cookies, fingerprinting, or
            third-party analytics. Fonts are loaded directly from Google Fonts;
            if you would rather they weren&apos;t, the open-source repository
            includes them as self-host bundles you can compile yourself.
          </p>
          <p>
            Your IP address is briefly visible to the CDN that delivers this
            page — that is unavoidable for any web request. No PaperMind-side
            logs are kept.
          </p>
        </Section>

        <Section number="06" title="Open source & verification">
          <p>
            Every claim on this page is verifiable. The full source code is
            released under Apache 2.0 on GitHub. You can inspect every network
            call, every disk write, and every cryptographic operation. You can
            also build and run the application from source if you prefer not
            to trust our binaries.
          </p>
          <p>
            If you find any behavior that contradicts this policy, please
            report it as a security issue on the public repository.
          </p>
        </Section>

        <Section number="07" title="Your rights">
          <p>
            Because we hold no data about you, there is nothing to request,
            export, correct, or delete. You are in sole possession of your
            documents, vaults, and recovery keys. Uninstalling the application
            and deleting your workspace folder permanently removes all
            PaperMind-related data from your device.
          </p>
        </Section>

        <Section number="08" title="Changes & contact">
          <p>
            If this policy ever changes, the updated date at the top of the
            page will reflect that, and the previous version will remain in
            git history forever. For questions or security disclosures, open
            an issue on the public repository.
          </p>
        </Section>
      </PageShell>
      <Footer />
    </>
  )
}
