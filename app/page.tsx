import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { AIExplainer } from '@/components/AIExplainer'
import { DocumentVault } from '@/components/DocumentVault'
import { Translator } from '@/components/Translator'
import { Privacy } from '@/components/Privacy'
import { HowItWorks } from '@/components/HowItWorks'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AIExplainer />
        <DocumentVault />
        <Translator />
        <Privacy />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
