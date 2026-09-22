import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Capabilities } from '@/sections/Capabilities'
import { Experience } from '@/sections/Experience'
import { Work } from '@/sections/Work'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { DotNav } from '@/components/Chrome'
import { useReveal } from '@/lib/useReveal'

export default function Home({ open }: { open: boolean }) {
  useReveal([])

  return (
    <>
      <DotNav />
      <main id="main">
        <Hero open={open} />
        <About />
        <Capabilities />
        <Experience />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
