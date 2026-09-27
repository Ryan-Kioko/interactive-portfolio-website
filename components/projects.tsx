'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { ProjectVisual } from './project-visuals'
import { SectionHeading } from './section-heading'

const domains = ['All', 'NLP', 'Computer Vision', 'Clinical AI', 'Full-Stack AI'] as const

export function Projects() {
  const [domain, setDomain] = useState<(typeof domains)[number]>('All')
  const list = projects.filter((p) => domain === 'All' || p.domain === domain)
  const [activeId, setActiveId] = useState(projects[0].id)
  const active = list.find((p) => p.id === activeId) ?? list[0]

  return (
    <section id="projects" className="py-28" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="projects-title"
          eyebrow="03 — Project Lab"
          title="Six builds, four AI domains"
          description="From a first Rasa chatbot to a full-stack agent platform — each project is interactive. Select one to explore how it works."
        />

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by domain">
          {domains.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDomain(d)}
              aria-pressed={domain === d}
              className={cn(
                'rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
                domain === d
                  ? 'border-rose bg-rose text-wine'
                  : 'border-border text-muted-foreground hover:border-rose/60 hover:text-foreground',
              )}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <ul className="flex flex-col gap-2" aria-label="Projects">
            {list.map((p) => {
              const selected = active?.id === p.id
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    aria-pressed={selected}
                    className={cn(
                      'w-full rounded-2xl border p-4 text-left transition-all',
                      selected
                        ? 'border-rose bg-card shadow-lg shadow-black/20'
                        : 'border-border bg-card/40 hover:border-rose/50 hover:bg-card/70',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-rose">
                        {p.domain}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
                    </div>
                    <p className="mt-1 font-semibold">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.tagline}</p>
                  </button>
                </li>
              )
            })}
          </ul>

          <AnimatePresence mode="wait">
            {active ? (
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-border bg-gradient-to-br from-card to-deep p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-rose">{active.domain}</p>
                    <h3 className="mt-1 text-3xl font-bold tracking-tight">{active.title}</h3>
                    <p className="text-muted-foreground">{active.tagline}</p>
                  </div>
                  <a
                    href={active.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-rose hover:text-rose"
                  >
                    View repo <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-deep/60 p-4 md:p-5">
                  <ProjectVisual visual={active.visual} />
                </div>

                <ul className="mt-6 flex flex-col gap-2">
                  {active.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rose" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {active.stack.map((s) => (
                    <li key={s} className="rounded-md bg-teal/25 px-2 py-0.5 font-mono text-[11px]">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
