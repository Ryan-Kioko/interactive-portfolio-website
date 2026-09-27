import { FolderGit2, Mail, Phone } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { HireMeDialog } from '@/components/hire-me-dialog'

export function Contact() {
  const items = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: FolderGit2, label: 'GitHub', value: 'github.com/Ryan-Kioko', href: profile.github },
    { icon: Phone, label: 'UK', value: profile.phoneUK, href: `tel:${profile.phoneUK.replace(/\s/g, '')}` },
    { icon: Phone, label: 'Kenya', value: profile.phoneKE, href: `tel:${profile.phoneKE.replace(/\s/g, '')}` },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-28" aria-labelledby="contact-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,#da7b9333,transparent_60%)]"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-rose">05 — Next Stop</p>
        <h2 id="contact-title" className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
          {"Let's build the next milestone together."}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {"I'm looking for an AI engineering internship where I can apply ML to real-world problems — especially in Nairobi's growing tech ecosystem."}
        </p>
        <div className="mt-8 flex justify-center">
          <HireMeDialog label="Send me a message" className="px-6 py-3 text-base" />
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {items.map((it) => (
            <li key={it.label + it.value}>
              <a
                href={it.href}
                target={it.href.startsWith('http') ? '_blank' : undefined}
                rel={it.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-rose"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-rose/15 text-rose">
                  <it.icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {it.label}
                  </span>
                  <span className="block text-sm">{it.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <footer className="relative mx-auto mt-24 max-w-6xl border-t border-border px-5 pt-6 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ryan Kioko · Built with Next.js, Three.js & Recharts
      </footer>
    </section>
  )
}
