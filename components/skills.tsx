'use client'

import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { BadgeCheck } from 'lucide-react'
import { certifications, skillGrowth, skillRadar, techStack } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const series = [
  { key: 'ML', color: '#da7b93' },
  { key: 'NLP', color: '#f1b3c3' },
  { key: 'Vision', color: '#6fa8a9' },
  { key: 'Data', color: '#a8bfc2' },
  { key: 'Web', color: '#376e6f' },
  { key: 'Leadership', color: '#f1e9ec' },
] as const

const tooltipStyle = {
  background: '#2e151b',
  border: '1px solid rgba(241,233,236,0.15)',
  borderRadius: 8,
  color: '#f1e9ec',
  fontSize: 12,
}

export function Skills() {
  const [focus, setFocus] = useState<string | null>(null)

  return (
    <section
      id="skills"
      className="border-y border-border bg-slate-ink/40 py-28"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="skills-title"
          eyebrow="04 — Growth Curve"
          title="How the skill set compounded"
          description="Every year stacked new capabilities on the last. Hover a domain to isolate it and see when it took off."
        />

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-border bg-deep/70 p-5">
            <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Highlight domain">
              {series.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onMouseEnter={() => setFocus(s.key)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(s.key)}
                  onBlur={() => setFocus(null)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[11px] transition-opacity',
                    focus && focus !== s.key && 'opacity-40',
                  )}
                >
                  <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} aria-hidden />
                  {s.key}
                </button>
              ))}
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={skillGrowth} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    {series.map((s) => (
                      <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.color} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid stroke="#2f4454" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fill: '#a8bfc2', fontSize: 11 }} stroke="#2f4454" />
                  <YAxis tick={{ fill: '#a8bfc2', fontSize: 11 }} stroke="#2f4454" domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  {series.map((s) => (
                    <Area
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      stroke={s.color}
                      strokeWidth={focus === s.key ? 3 : 1.5}
                      fill={`url(#g-${s.key})`}
                      fillOpacity={focus && focus !== s.key ? 0.05 : 1}
                      strokeOpacity={focus && focus !== s.key ? 0.15 : 1}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Self-assessed proficiency by domain · 2022–2026
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-deep/70 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Current profile
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar} outerRadius="72%">
                  <PolarGrid stroke="#2f4454" />
                  <PolarAngleAxis dataKey="domain" tick={{ fill: '#a8bfc2', fontSize: 11 }} />
                  <Radar dataKey="value" stroke="#da7b93" fill="#da7b93" fillOpacity={0.35} strokeWidth={2} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ display: 'none' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {techStack.map((g) => (
              <div key={g.group} className="rounded-2xl border border-border bg-card/50 p-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-rose">{g.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-md border border-border bg-deep px-2 py-0.5 text-xs transition-colors hover:border-rose hover:text-rose"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-wine/60 p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-rose">Certifications</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-rose" aria-hidden />
                  <div>
                    <p className="text-sm font-medium leading-snug">{c.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {c.issuer} · {c.code}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
