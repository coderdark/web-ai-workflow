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
}

export function ClassesPage() {
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

  return (
    <section className="space-y-5 rounded-[24px] border border-slate-300/70 bg-slate-50/75 p-6 shadow-xl shadow-slate-400/20 backdrop-blur">
      <div>
        <h1 className="text-3xl font-extrabold">Class Catalog</h1>
        <p className="mt-1 text-slate-600">Discover focused AI classes built for busy professionals.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <input className="rounded-xl border border-slate-300 bg-slate-100/95 px-4 py-2.5 focus:border-teal-500 focus:outline-none" placeholder="Search classes" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="rounded-xl border border-slate-300 bg-slate-100/95 px-4 py-2.5 focus:border-teal-500 focus:outline-none" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="">All topics</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="rounded-xl border border-slate-300 bg-slate-100/95 px-4 py-2.5 focus:border-teal-500 focus:outline-none" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">All levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((c) => (
          <article key={c.id} className="group rounded-2xl border border-slate-300/70 bg-gradient-to-b from-slate-50 to-slate-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">{c.difficulty}</span>
              {c.topic_tags.split(',').map((tag) => (
                <span key={tag} className="rounded-full bg-cyan-50 px-2 py-1 font-semibold text-cyan-700">{tag.trim()}</span>
              ))}
            </div>
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p className="mt-2 text-slate-600">{c.short_description}</p>
            {c.is_preview ? <span className="mt-3 inline-block rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">Preview Class</span> : null}
            <div className="mt-4"><Link className="font-bold text-teal-700 group-hover:text-teal-800" to={`/class/${c.slug}`}>Open class →</Link></div>
          </article>
        ))}
      </div>
    </section>
  )
}
