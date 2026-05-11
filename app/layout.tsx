import type { Metadata } from 'next'
import { DM_Serif_Display, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PaperMind — Your Private Legacy Vault',
  description:
    'A private AI that reads, translates, and explains your most important documents — entirely offline. No cloud, no leaks, just clarity.',
  keywords: [
    'PaperMind',
    'offline AI',
    'document AI',
    'privacy',
    'legacy vault',
    'QVAC',
    'Solana',
    'local AI',
  ],
  openGraph: {
    title: 'PaperMind — Your Private Legacy Vault',
    description: 'Offline AI for documents that matter. Local, private, encrypted.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
