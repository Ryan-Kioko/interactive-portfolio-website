'use client'

import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const tooltipStyle = {
  background: '#2e151b',
  border: '1px solid rgba(241,233,236,0.15)',
  borderRadius: 8,
  color: '#f1e9ec',
  fontSize: 12,
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{children}</p>
}

function AgentFlow() {
  const steps = ['Invoice in', 'Claude agent', 'Policy check', 'Postgres + RLS', 'Audit trail']
  return (
    <div>
      <ol className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className={cn(
                'flex-1 rounded-xl border px-3 py-4 text-center text-xs font-medium',
                i === 1 ? 'border-rose bg-rose/20 text-foreground' : 'border-border bg-deep text-foreground/90',
              )}
            >
              <span className="block font-mono text-[10px] text-rose">0{i + 1}</span>
              {s}
            </motion.div>
            {i < steps.length - 1 ? (
              <div className="relative mx-1 hidden h-px w-6 overflow-hidden bg-border sm:block" aria-hidden>
                <motion.span
                  className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-rose"
                  animate={{ x: [-4, 24] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25, ease: 'linear' }}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ['Frontend', 'Next.js · Vercel'],
          ['Backend', 'FastAPI · Railway'],
          ['Infra', 'Docker · Prisma'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-deep/80 p-2">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{k}</p>
            <p className="text-xs">{v}</p>
          </div>
        ))}
      </div>
      <Caption>System architecture · agent pipeline</Caption>
    </div>
  )
}

function TappingSignal() {
  const [hand, setHand] = useState<'healthy' | 'pd'>('pd')
  const data = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => {
        const t = i / 8
        const healthy = Math.abs(Math.sin(t * 2.2)) * 1
        const decay = Math.max(0.25, 1 - i / 110)
        const pd = Math.abs(Math.sin(t * 1.6 + Math.sin(i / 5) * 0.4)) * decay * (0.8 + ((i * 17) % 7) / 30)
        return { t: t.toFixed(1), healthy: +healthy.toFixed(3), pd: +pd.toFixed(3) }
      }),
    [],
  )
  return (
    <div>
      <div className="mb-3 flex gap-2" role="group" aria-label="Signal type">
        {(['pd', 'healthy'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setHand(k)}
            aria-pressed={hand === k}
            className={cn(
              'rounded-full px-3 py-1 font-mono text-[11px] uppercase',
              hand === k ? 'bg-rose text-wine' : 'bg-deep text-muted-foreground hover:text-foreground',
            )}
          >
            {k === 'pd' ? "Parkinson's" : 'Healthy control'}
          </button>
        ))}
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -24, right: 4, top: 4 }}>
            <defs>
              <linearGradient id="sigFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={hand === 'pd' ? '#da7b93' : '#6fa8a9'} stopOpacity={0.6} />
                <stop offset="100%" stopColor={hand === 'pd' ? '#da7b93' : '#6fa8a9'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" tick={{ fill: '#a8bfc2', fontSize: 10 }} interval={15} stroke="#2f4454" />
            <YAxis tick={{ fill: '#a8bfc2', fontSize: 10 }} stroke="#2f4454" domain={[0, 1.1]} />
            <Tooltip contentStyle={tooltipStyle} labelFormatter={(l) => `t = ${l}s`} />
            <Area
              type="monotone"
              dataKey={hand}
              name="amplitude"
              stroke={hand === 'pd' ? '#da7b93' : '#6fa8a9'}
              fill="url(#sigFill)"
              strokeWidth={2}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Caption>Illustrative finger-tapping amplitude · note the decrement in PD</Caption>
    </div>
  )
}

const updrs = [
  { score: 0, label: 'Normal', note: 'No problems tapping' },
  { score: 1, label: 'Slight', note: 'Minor interruptions or slowing' },
  { score: 2, label: 'Mild', note: 'Several interruptions, mild slowing' },
  { score: 3, label: 'Moderate', note: 'Frequent hesitations, decrement' },
  { score: 4, label: 'Severe', note: 'Cannot or can barely perform' },
]

function SeverityScale() {
  const [active, setActive] = useState(2)
  const colors = ['#376e6f', '#6fa8a9', '#a8bfc2', '#da7b93', '#b0445f']
  return (
    <div>
      <div className="flex h-44 items-end gap-2">
        {updrs.map((u) => (
          <button
            key={u.score}
            type="button"
            onMouseEnter={() => setActive(u.score)}
            onFocus={() => setActive(u.score)}
            onClick={() => setActive(u.score)}
            aria-pressed={active === u.score}
            className="group flex flex-1 flex-col items-center gap-2"
          >
            <motion.span
              className="w-full rounded-t-lg"
              style={{ backgroundColor: colors[u.score] }}
              animate={{ height: `${40 + u.score * 25}px`, opacity: active === u.score ? 1 : 0.45 }}
            />
            <span className="font-mono text-xs">{u.score}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-deep p-3">
        <p className="text-sm font-semibold">
          UPDRS {updrs[active].score} · <span className="text-rose">{updrs[active].label}</span>
        </p>
        <p className="text-xs text-muted-foreground">{updrs[active].note}</p>
      </div>
      <Caption>Target classes · MDS-UPDRS finger tapping item</Caption>
    </div>
  )
}

const emotions = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

function ConfusionMatrix() {
  const [hover, setHover] = useState<[number, number] | null>(null)
  const matrix = useMemo(
    () =>
      emotions.map((_, r) =>
        emotions.map((__, c) => {
          if (r === c) return 0.55 + ((r * 13) % 5) * 0.08
          const near = (r === 2 && c === 4) || (r === 4 && c === 6) || (r === 0 && c === 1)
          return near ? 0.18 : ((r * 7 + c * 3) % 5) * 0.015
        }),
      ),
    [],
  )
  return (
    <div>
      <div className="grid grid-cols-[56px_1fr] gap-1">
        <div />
        <div className="grid grid-cols-7 gap-1">
          {emotions.map((e) => (
            <span key={e} className="truncate text-center font-mono text-[9px] text-muted-foreground">
              {e.slice(0, 3)}
            </span>
          ))}
        </div>
        {matrix.map((row, r) => (
          <div key={r} className="contents">
            <span className="self-center truncate text-right font-mono text-[10px] text-muted-foreground">
              {emotions[r]}
            </span>
            <div className="grid grid-cols-7 gap-1">
              {row.map((v, c) => (
                <span
                  key={c}
                  onMouseEnter={() => setHover([r, c])}
                  onMouseLeave={() => setHover(null)}
                  className={cn(
                    'aspect-square rounded-sm transition-transform',
                    hover?.[0] === r && hover?.[1] === c && 'scale-110 ring-1 ring-foreground',
                  )}
                  style={{ backgroundColor: `rgba(218,123,147,${Math.min(v * 1.4, 1)})`, outline: '1px solid #2f4454' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 h-4 text-xs text-foreground/90">
        {hover
          ? `True ${emotions[hover[0]]} → predicted ${emotions[hover[1]]}`
          : 'Hover a cell: rows are true labels, columns are predictions'}
      </p>
      <Caption>Illustrative confusion matrix · 7 emotion classes</Caption>
    </div>
  )
}

function SentimentDonut() {
  const data = [
    { name: 'Negative', value: 52, color: '#da7b93' },
    { name: 'Neutral', value: 30, color: '#a8bfc2' },
    { name: 'Positive', value: 18, color: '#376e6f' },
  ]
  const pipeline = ['Scrape', 'Clean', 'Transformer', 'Dashboard']
  return (
    <div className="grid items-center gap-4 sm:grid-cols-2">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#f1e9ec' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <ol className="flex flex-col gap-2">
          {pipeline.map((p, i) => (
            <li key={p} className="flex items-center gap-2 text-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-deep font-mono text-[10px] text-rose">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ol>
      </div>
      <div className="sm:col-span-2">
        <Caption>Illustrative sentiment split · see repo for actual results</Caption>
      </div>
    </div>
  )
}

function ChatDemo() {
  const lines = [
    { from: 'user', text: 'Recommend me a sci-fi movie' },
    { from: 'nlu', text: 'intent: recommend_movie · genre: sci-fi' },
    { from: 'bot', text: 'Try "Interstellar" — want something older?' },
  ]
  return (
    <div>
      <div className="flex flex-col gap-2 rounded-xl bg-deep p-4">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: l.from === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5 }}
            className={cn(
              'max-w-[85%] rounded-2xl px-3 py-2 text-sm',
              l.from === 'user' && 'self-end bg-rose text-wine',
              l.from === 'bot' && 'self-start bg-card',
              l.from === 'nlu' && 'self-center border border-dashed border-teal bg-transparent font-mono text-[11px] text-muted-foreground',
            )}
          >
            {l.text}
          </motion.div>
        ))}
      </div>
      <Caption>Rasa NLU → intent + entity → recommendation</Caption>
    </div>
  )
}

export function ProjectVisual({ visual }: { visual: Project['visual'] }) {
  switch (visual) {
    case 'agent':
      return <AgentFlow />
    case 'signal':
      return <TappingSignal />
    case 'severity':
      return <SeverityScale />
    case 'confusion':
      return <ConfusionMatrix />
    case 'sentiment':
      return <SentimentDonut />
    case 'chat':
      return <ChatDemo />
  }
}
