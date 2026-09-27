'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import { graphLinks, graphSkills, milestones } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const ConstellationScene = dynamic(() => import('./three/constellation-scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
      Loading constellation…
    </div>
  ),
})

const legend = [
  { label: 'Education', color: 'bg-[#6fa8a9]' },
  { label: 'Work', color: 'bg-[#f1e9ec]' },
  { label: 'Leadership', color: 'bg-[#a8bfc2]' },
  { label: 'Project', color: 'bg-rose' },
  { label: 'Skill', color: 'bg-teal' },
]

export function Constellation() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const milestone = milestones.find((m) => m.id === activeId)
  const isSkill = activeId ? graphSkills.includes(activeId) : false

  const related = activeId
    ? graphLinks
        .filter(([e, s]) => e === activeId || s === activeId)
        .map(([e, s]) => (e === activeId ? s : e))
    : []

  const skillUsage = graphSkills
    .map((s) => ({ skill: s, count: graphLinks.filter(([, sk]) => sk === s).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <section
      id="constellation"
      className="relative border-y border-border bg-wine/40 py-28"
      aria-labelledby="constellation-title"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="constellation-title"
          eyebrow="02 — Career Constellation"
          title="How every experience connects"
          description="A 3D map of my path. The pink spiral is time; each node on it is an experience, and every thread links it to the skills it built. Drag to orbit, hover or click a node to trace its influence."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="relative h-[520px] overflow-hidden rounded-3xl border border-border bg-deep md:h-[620px]">
            <ConstellationScene activeId={activeId} onSelect={setActiveId} />
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-wine/80 px-3 py-1 font-mono text-[11px] text-muted-foreground">
              <MousePointerClick className="size-3.5 text-rose" aria-hidden />
              drag · hover · click
            </div>
            <ul className="absolute bottom-4 left-4 flex flex-wrap gap-3" aria-label="Legend">
              {legend.map((l) => (
                <li key={l.label} className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <span className={cn('size-2 rounded-full', l.color)} aria-hidden />
                  {l.label}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-4" aria-live="polite">
            <div className="rounded-2xl border border-border bg-card/70 p-5">
              {activeId ? (
                <>
                  <p className="font-mono text-xs uppercase tracking-wider text-rose">
                    {isSkill ? 'Skill' : milestone?.period}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{isSkill ? activeId : milestone?.title}</h3>
                  {milestone ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  ) : null}
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {isSkill ? 'Built through' : 'Shaped these skills'}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {related.length === 0 ? (
                      <li className="text-sm text-muted-foreground">The destination — everything leads here.</li>
                    ) : (
                      related.map((r) => {
                        const label = milestones.find((m) => m.id === r)?.title ?? r
                        return (
                          <li key={r}>
                            <button
                              type="button"
                              onClick={() => setActiveId(r)}
                              className="rounded-md border border-teal/50 bg-teal/20 px-2 py-0.5 text-left text-xs transition-colors hover:border-rose hover:text-rose"
                            >
                              {label}
                            </button>
                          </li>
                        )
                      })
                    )}
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-mono text-xs uppercase tracking-wider text-rose">Explore</p>
                  <h3 className="mt-1 text-xl font-semibold">Pick any node</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Select an experience to see which skills it shaped, or a skill to see where it came from.
                  </p>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Most reinforced skills
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {skillUsage.map((s) => (
                  <li key={s.skill}>
                    <button
                      type="button"
                      onClick={() => setActiveId(s.skill)}
                      className="w-full text-left"
                    >
                      <div className="mb-1 flex justify-between text-sm">
                        <span className={cn(activeId === s.skill && 'text-rose')}>{s.skill}</span>
                        <span className="font-mono text-xs text-muted-foreground">{s.count} exp.</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-deep">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal to-rose"
                          style={{ width: `${(s.count / skillUsage[0].count) * 100}%` }}
                        />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
