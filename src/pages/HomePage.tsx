import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[28px] border border-teal-300/40 bg-gradient-to-br from-teal-700 via-cyan-700 to-sky-800 p-10 text-white shadow-2xl shadow-teal-900/20">
        <div className="absolute -right-14 -top-14 h-52 w-52 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-cyan-300/20 blur-3xl" />
        <p className="mb-4 inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.15em]">For non-technical professionals</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Master practical AI workflows without the technical noise.</h1>
        <p className="mt-5 max-w-2xl text-lg text-teal-50">Learn through focused classes built for real work scenarios: email, meetings, writing, planning, and productivity.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/classes" className="rounded-xl bg-white px-6 py-3 font-bold text-teal-800 shadow-lg shadow-teal-950/20">Explore classes</Link>
          <Link to="/how-it-works" className="rounded-xl border border-white/50 px-6 py-3 font-bold text-white">See the learning path</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Structured learning', 'Follow modules designed for immediate real-world use.'],
          ['Clear progress', 'Track every lesson and keep momentum session to session.'],
          ['Practical resources', 'Use downloadable worksheets and templates while learning.']
        ].map(([title, desc], idx) => (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">{idx + 1}</div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-slate-600">{desc}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
