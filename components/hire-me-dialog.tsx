'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

export function HireMeDialog({ className, label = 'Hire me' }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('botcheck')) return
    if (!ACCESS_KEY) {
      setStatus('error')
      setError('The contact form is not configured yet. Please email ryanwendo@gmail.com directly.')
      return
    }

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    setStatus('sending')
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio: ${name}${company ? ` from ${company}` : ''} is interested in working with you`,
          from_name: 'Ryan Kioko Portfolio',
          replyto: email,
          name,
          email,
          company: company || '—',
          message,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to send')
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setStatus('idle')
      setError('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={cn(
          'rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-wine transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose',
          className,
        )}
      >
        {label}
      </DialogTrigger>
      <DialogContent className="border-border bg-deep sm:max-w-lg">
        {status === 'sent' ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="size-12 text-rose" aria-hidden />
            <DialogTitle className="text-xl">Message sent</DialogTitle>
            <DialogDescription>
              {"Thanks for reaching out — I'll get back to you at the email you provided."}
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{"Let's work together"}</DialogTitle>
              <DialogDescription>
                Tell me about the role or project. Your message goes straight to my inbox.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="hire-name">Name</Label>
                  <Input id="hire-name" name="name" required maxLength={100} autoComplete="name" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="hire-email">Your email</Label>
                  <Input
                    id="hire-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="hire-company">
                  Company <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input id="hire-company" name="company" maxLength={120} autoComplete="organization" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="hire-message">Message</Label>
                <Textarea
                  id="hire-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  placeholder="Hi Ryan, we have an AI engineering internship that..."
                />
              </div>
              {status === 'error' && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-wine transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
