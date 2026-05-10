export function HowItWorksPage() {
  const steps = [
    ['Explore and choose', 'Browse practical topics and pick the right skill level.'],
    ['Enroll quickly', 'Register in seconds with your first name and email.'],
    ['Learn by doing', 'Use lesson videos, explanations, and downloadable guides.'],
    ['Track momentum', 'Mark lessons complete and keep your learning streak going.']
  ]

  return (
    <section className="space-y-5 rounded-[24px] border border-slate-300/70 bg-slate-50/75 p-6 shadow-xl shadow-slate-400/20 backdrop-blur">
      <h1 className="text-3xl font-extrabold">How ApexTuts Works</h1>
      <p className="text-slate-600">A clear flow from discovery to real skills you can apply immediately.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map(([title, desc], i) => (
          <article key={title} className="rounded-2xl border border-slate-300/70 bg-gradient-to-r from-slate-50 to-slate-100 p-5">
            <p className="text-sm font-bold text-teal-700">Step {i + 1}</p>
            <h3 className="mt-1 text-xl font-bold">{title}</h3>
            <p className="mt-2 text-slate-600">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
