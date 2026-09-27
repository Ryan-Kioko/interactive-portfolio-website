'use client'

import { motion, useScroll, useSpring } from 'motion/react'
import { HireMeDialog } from '@/components/hire-me-dialog'

const links = [
  { href: '#journey', label: 'Journey' },
  { href: '#constellation', label: 'Constellation' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-deep/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3"
      >
        <a href="#top" className="font-mono text-sm tracking-tight text-foreground">
          ryan<span className="text-rose">.kioko</span>
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-rose"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <HireMeDialog />
      </nav>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="h-0.5 origin-left bg-gradient-to-r from-teal via-rose to-rose"
      />
    </header>
  )
}
