import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { useSessionStore } from '../store/session'

type Class = {
  id: number
  slug: string
  title: string
  short_description: string
  difficulty: string
  topic_tags: string
  is_preview: number
  duration?: string
  instructor?: string
}

export function CatalogPage() {
  const [q, setQ] = useState('')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [items, setItems] = useState<Class[]>([])
  const sessionKey = useSessionStore((s) => s.sessionKey)

  useEffect(() => {
    const params = new URLSearchParams({ q, topic, difficulty })
    api.classes(params).then(setItems)
  }, [q, topic, difficulty])

  useEffect(() => {
    api.event({ eventName: 'page_view', timestamp: new Date().toISOString(), sessionKey })
  }, [sessionKey])

  const topics = useMemo(() => {
    const set = new Set<string>()
    for (const i of items) i.topic_tags.split(',').forEach((t) => set.add(t.trim()))
    return Array.from(set)
  }, [items])

  const featured = items.slice(0, 3)

  return (
    <div className="space-y-14">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-teal-900 p-10 text-white">
        <p className="mb-3 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-wide text-teal-100">AI classes for non-technical professionals</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">Learn practical AI skills you can use at work this week.</h1>
        <p className="mt-4 max-w-2xl text-slate-100">ApexTuts gives you focused classes, step-by-step lessons, and progress tracking so you can build confidence without technical overwhelm.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#classes" className="rounded-lg bg-teal-400 px-5 py-3 font-medium text-slate-900">Browse classes</a>
          <a href="#how" className="rounded-lg border border-white/40 px-5 py-3 font-medium text-white">See how it works</a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Featured classes</h2>
        <p className="mt-1 text-slate-600">Start with short, actionable courses designed for everyday workflows.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featured.map((c) => (
            <article key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">{c.difficulty} {c.duration ? `• ${c.duration}` : ''}</p>
              <h3 className="mt-2 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{c.short_description}</p>
              {c.is_preview ? <span className="mt-3 inline-block rounded-full bg-teal-50 px-2 py-1 text-xs text-teal-700">Preview Class</span> : null}
              <div className="mt-4"><Link className="font-medium text-teal-700 hover:text-teal-800" to={`/class/${c.slug}`}>View class →</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section id="classes" className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Class catalog</h2>
            <p className="text-slate-600">Find the class that matches your goal and pace.</p>
          </div>
        </div>
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Search classes" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="rounded-lg border border-slate-300 px-3 py-2" value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">All topics</option>
            {topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="rounded-lg border border-slate-300 px-3 py-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((c) => (
            <article key={c.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                <span>{c.difficulty}</span>
                <span>•</span>
                <span>{c.topic_tags}</span>
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.short_description}</p>
              {c.is_preview ? <span className="mt-3 inline-block rounded-full bg-teal-50 px-2 py-1 text-xs text-teal-700">Preview Class</span> : null}
              <div className="mt-3"><Link className="font-medium text-teal-700" to={`/class/${c.slug}`}>Open class →</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="grid gap-4 md:grid-cols-3">
        {[
          ['Pick a class', 'Choose by topic and difficulty based on your current skill level.'],
          ['Learn in lessons', 'Go through practical modules with video, text, and downloads.'],
          ['Track progress', 'Mark lessons complete and continue where you left off on this device.']
        ].map(([title, desc]) => (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
          </article>
        ))}
      </section>

      <section id="faq" className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <p className="mt-3 text-sm text-slate-700"><strong>How is progress saved?</strong> Progress is saved only on this browser and device in v1. Clearing browser data or switching devices will reset progress.</p>
      </section>
    </div>
  )
}
