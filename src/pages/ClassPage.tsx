import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { useProgressStore } from '../store/progress'
import { useSessionStore } from '../store/session'

type Lesson = { id: number; title: string; content: string; video_url?: string; download_url?: string; parent_module_id: number }
type Module = { id: number; title: string }

type ClassDetail = {
  id: number
  title: string
  short_description: string
  instructor: string
  duration: string
  difficulty: string
  topic_tags: string
  is_preview: number
  modules: Module[]
  lessons: Lesson[]
}

export function ClassPage() {
  const { slug = '' } = useParams()
  const [data, setData] = useState<ClassDetail | null>(null)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const sessionKey = useSessionStore((s) => s.sessionKey)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const isCompleted = useProgressStore((s) => s.isCompleted)

  useEffect(() => {
    api.classBySlug(slug).then((resp) => {
      setData(resp)
      api.event({ eventName: 'class_detail_view', timestamp: new Date().toISOString(), classId: resp.id, sessionKey })
      if (resp.lessons.length && activeLessonId === null) setActiveLessonId(resp.lessons[0].id)
    })
  }, [slug, sessionKey, activeLessonId])

  const activeLesson = useMemo(() => data?.lessons.find((l) => l.id === activeLessonId), [data, activeLessonId])

  if (!data) return <p>Loading...</p>

  const enroll = async (e: FormEvent) => {
    e.preventDefault()
    api.event({ eventName: 'enroll_click', timestamp: new Date().toISOString(), classId: data.id, sessionKey })
    const resp = await api.enroll({ classId: data.id, firstName, email })
    if (resp.ok) {
      setMessage('Enrollment successful')
      api.event({ eventName: 'enrollment_success', timestamp: new Date().toISOString(), classId: data.id, sessionKey })
    } else {
      setMessage(resp.error || 'Could not enroll')
    }
  }

  const onOpenLesson = (lessonId: number) => {
    setActiveLessonId(lessonId)
    if (!localStorage.getItem('apextuts-progress-warning-accepted')) {
      alert('Progress is saved only on this browser and device in v1. Clearing browser data or switching devices will reset progress.')
      localStorage.setItem('apextuts-progress-warning-accepted', '1')
    }
    api.event({ eventName: 'lesson_started', timestamp: new Date().toISOString(), classId: data.id, lessonId, sessionKey })
  }

  const onComplete = () => {
    if (!activeLesson) return
    markCompleted(data.id, activeLesson.id)
    api.event({ eventName: 'lesson_completed', timestamp: new Date().toISOString(), classId: data.id, lessonId: activeLesson.id, sessionKey })
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-300/70 bg-slate-50/80 p-6 shadow-xl shadow-slate-400/20 backdrop-blur">
        <h1 className="text-3xl font-extrabold md:text-4xl">{data.title}</h1>
        <p className="mt-2 text-slate-700">{data.short_description}</p>
        <p className="mt-3 text-sm text-slate-600">{data.instructor} | {data.duration} | {data.difficulty}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.topic_tags.split(',').map((tag) => (
            <span key={tag} className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-800">{tag.trim()}</span>
          ))}
        </div>
      </div>

      {data.is_preview ? (
        <div className="rounded-2xl border border-amber-300/80 bg-amber-50/90 p-4 text-amber-900">
          <p className="font-semibold">This is a Preview Class. Join waitlist for full access.</p>
        </div>
      ) : (
        <section className="rounded-2xl border border-slate-300/70 bg-slate-50/75 p-5">
          <h2 className="text-lg font-bold">Enroll in this class</h2>
          <form className="mt-3 grid gap-2 sm:grid-cols-3" onSubmit={enroll}>
            <input className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="rounded-lg bg-teal-700 px-3 py-2 font-semibold text-white" type="submit">Enroll</button>
          </form>
        </section>
      )}
      {message ? <p className="text-sm font-semibold text-teal-700">{message}</p> : null}

      <section className="rounded-2xl border border-slate-300/70 bg-slate-50/75 p-5">
        <h2 className="text-2xl font-bold">Lessons</h2>
        <ul className="mt-3 space-y-2">
          {data.lessons.map((l) => (
            <li key={l.id}>
              <button className="font-medium text-teal-700 underline underline-offset-4" onClick={() => onOpenLesson(l.id)}>{l.title}</button>
              <span className="ml-1 text-sm text-slate-600">{isCompleted(data.id, l.id) ? '(Completed)' : ''}</span>
            </li>
          ))}
        </ul>
      </section>

      {activeLesson ? (
        <article className="rounded-2xl border border-slate-300/70 bg-slate-50/80 p-5 shadow-sm">
          <h3 className="text-xl font-bold">{activeLesson.title}</h3>
          <p className="mt-2 text-slate-700">{activeLesson.content}</p>
          {activeLesson.video_url ? <iframe className="mt-4 aspect-video w-full rounded-lg border border-slate-300" title="lesson-video" src={activeLesson.video_url} /> : null}
          {activeLesson.download_url ? <a className="mt-3 inline-block font-semibold text-teal-700 underline underline-offset-4" href={activeLesson.download_url}>Download resource</a> : null}
          <div className="mt-4">
            <button className="rounded-lg bg-teal-700 px-3 py-2 font-semibold text-white" onClick={onComplete}>Mark as complete</button>
          </div>
          <p className="mt-4 text-sm text-slate-600"><strong>FAQ:</strong> Progress is saved only on this browser and device in v1. Clearing browser data or switching devices will reset progress.</p>
        </article>
      ) : null}
    </section>
  )
}
