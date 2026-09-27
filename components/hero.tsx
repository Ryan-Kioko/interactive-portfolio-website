'use client'

import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { ArrowDown, FolderGit2, Mail } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

const NeuralScene = dynamic(() => import('./three/neural-scene'), { ssr: false })

const stats = [
  { value: '6', label: 'AI projects shipped' },
  { value: '4', label: 'Teams led as Scrum Master' },
  { value: '4', label: 'Certifications' },
  { value: '2027', label: 'BSc Applied AI' },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#376e6f55,transparent_60%),radial-gradient(ellipse_at_10%_90%,#2e151b,transparent_55%)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
            {'// Nairobi → Bradford → AI Engineering'}
          </p>
          <h1
            id="hero-title"
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          >
            Ryan Kioko
            <span className="block text-muted-foreground">builds AI that</span>
            <span className="block text-rose">solves real problems.</span>
          </h1>
          <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
            {profile.summary}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-semibold text-wine transition-transform hover:-translate-y-0.5"
            >
              Follow the journey <ArrowDown className="size-4" aria-hidden />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-rose hover:text-rose"
            >
              <FolderGit2 className="size-4" aria-hidden /> GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-rose hover:text-rose"
            >
              <Mail className="size-4" aria-hidden /> Email
            </a>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-foreground">{s.value}</dd>
                <dd className="text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[420px] w-full md:h-[560px]"
        >
          <NeuralScene />
          <p className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            input → hidden → output · move your cursor
          </p>
        </motion.div>
      </div>
    </section>
  )
}
