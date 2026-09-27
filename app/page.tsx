import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Journey } from '@/components/journey'
import { Constellation } from '@/components/constellation'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Journey />
        <Constellation />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
