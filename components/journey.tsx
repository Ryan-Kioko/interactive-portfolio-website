'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Briefcase, FlaskConical, GraduationCap, Rocket, Users } from 'lucide-react'
import { milestones, type MilestoneKind } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const KIND_META: Record<MilestoneKind, { label: string; icon: typeof Briefcase; className: string }> = {
  education: { label: 'Education', icon: GraduationCap, className: 'bg-teal text-foreground' },
  work: { label: 'Work', icon: Briefcase, className: 'bg-foreground text-wine' },
  leadership: { label: 'Leadership', icon: Users, className: 'bg-slate-ink text-foreground ring-1 ring-rose/50' },
  project: { label: 'Project', icon: FlaskConical, className: 'bg-rose text-wine' },
  goal: { label: 'Next', icon: Rocket, className: 'bg-wine text-rose ring-1 ring-rose' },
}

const filters: (MilestoneKind | 'all')[] = ['all', 'education', 'work', 'leadership', 'project']

export function Journey() {
  const [filter, setFilter] = useState<MilestoneKind | 'all'>('all')
  const trackRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 70%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="journey" className="relative py-28" aria-labelledby="journey-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="journey-title"
          eyebrow="01 — The Journey"
          title="From IB classrooms to AI agents"
          description="Scroll the path. Each milestone added a new capability — academics built the foundation, work and leadership built the people skills, and projects stacked the technical depth."
        />

        <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter milestones">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                'rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
                filter === f
                  ? 'border-rose bg-rose text-wine'
                  : 'border-border text-muted-foreground hover:border-rose/60 hover:text-foreground',
              )}
            >
              {f === 'all' ? 'All' : KIND_META[f].label}
            </button>
          ))}
        </div>

        <ol ref={trackRef} className="relative">
          <div
            aria-hidden
            className="absolute bottom-0 left-5 top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={{ height: fill }}
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-teal via-rose to-rose md:left-1/2 md:-translate-x-1/2"
          />

          {milestones.map((m, i) => {
            const meta = KIND_META[m.kind]
            const Icon = meta.icon
            const visible = filter === 'all' || m.kind === filter || m.kind === 'goal'
            const right = i % 2 === 1
            return (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className={cn(
                  'relative mb-10 grid grid-cols-[40px_1fr] gap-4 transition-opacity duration-300 md:grid-cols-[1fr_56px_1fr] md:gap-0',
                  !visible && 'opacity-20',
                )}
              >
                <div
                  className={cn(
                    'hidden md:block',
                    right ? 'md:col-start-1' : 'md:col-start-3 md:row-start-1',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-full items-start pt-3 font-mono text-5xl font-bold text-foreground/10',
                      right ? 'justify-end pr-8' : 'pl-8',
                    )}
                    aria-hidden
                  >
                    {m.year}
                  </div>
                </div>

                <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                  <span
                    className={cn(
                      'mt-2 flex size-10 items-center justify-center rounded-full shadow-lg shadow-black/30',
                      meta.className,
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                </div>

                <article
                  className={cn(
                    'group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-rose/60 hover:bg-card',
                    right ? 'md:col-start-3 md:ml-6' : 'md:col-start-1 md:row-start-1 md:mr-6',
                  )}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-rose">{m.period}</span>
                    <span className="rounded-full bg-deep px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{m.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills gained">
                    {m.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-teal/50 bg-teal/15 px-2 py-0.5 font-mono text-[11px] text-foreground/90"
                      >
                        + {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
