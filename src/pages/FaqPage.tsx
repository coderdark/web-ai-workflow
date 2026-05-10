export function FaqPage() {
  const faqs = [
    ['How is progress saved?', 'Progress is saved only on this browser and device in v1. Clearing browser data or switching devices will reset progress.'],
    ['Do I need an account?', 'Not in v1. Enrollment uses first name and email only.'],
    ['Are preview classes fully available?', 'No. Preview classes are labeled clearly and are waitlist-only.']
  ]

  return (
    <section className="space-y-5 rounded-[24px] border border-slate-300/70 bg-slate-50/75 p-6 shadow-xl shadow-slate-400/20 backdrop-blur">
      <h1 className="text-3xl font-extrabold">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {faqs.map(([q, a]) => (
          <article key={q} className="rounded-2xl border border-slate-300/70 bg-slate-100/85 p-5">
            <h3 className="text-lg font-bold text-slate-900">{q}</h3>
            <p className="mt-2 text-slate-600">{a}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
