import express from 'express'
import cors from 'cors'
import { db, initDb } from './db.js'

initDb()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/classes', (req, res) => {
  const q = String(req.query.q || '').toLowerCase()
  const topic = String(req.query.topic || '').toLowerCase()
  const difficulty = String(req.query.difficulty || '').toLowerCase()
  const rows = db.prepare('SELECT * FROM classes WHERE published = 1').all() as any[]
  const filtered = rows.filter((r) => {
    const text = `${r.title} ${r.short_description}`.toLowerCase()
    if (q && !text.includes(q)) return false
    if (topic && !String(r.topic_tags).toLowerCase().includes(topic)) return false
    if (difficulty && String(r.difficulty).toLowerCase() !== difficulty) return false
    return true
  })
  res.json(filtered)
})

app.get('/api/classes/:slug', (req, res) => {
  const cls = db.prepare('SELECT * FROM classes WHERE slug = ? AND published = 1').get(req.params.slug) as any
  if (!cls) return res.status(404).json({ error: 'not found' })
  const modules = db.prepare('SELECT * FROM modules WHERE class_id = ? ORDER BY sort_order ASC').all(cls.id) as any[]
  const lessons = db.prepare(`
    SELECT l.*, m.id as parent_module_id
    FROM lessons l
    JOIN modules m ON m.id = l.module_id
    WHERE m.class_id = ?
    ORDER BY m.sort_order ASC, l.sort_order ASC
  `).all(cls.id) as any[]
  res.json({ ...cls, modules, lessons })
})

app.post('/api/enroll', (req, res) => {
  const { classId, firstName, email } = req.body as { classId: number; firstName: string; email: string }
  if (!classId || !firstName || !email) return res.status(400).json({ error: 'missing fields' })
  const cls = db.prepare('SELECT is_preview FROM classes WHERE id = ?').get(classId) as any
  if (!cls) return res.status(404).json({ error: 'class not found' })
  if (cls.is_preview) return res.status(400).json({ error: 'preview classes are waitlist-only' })
  db.prepare('INSERT INTO enrollments (class_id, first_name, email) VALUES (?, ?, ?)').run(classId, firstName, email)
  res.json({ ok: true })
})

app.post('/api/events', (req, res) => {
  const { eventName, timestamp, classId, lessonId, sessionKey } = req.body
  if (!eventName || !timestamp || !sessionKey) return res.status(400).json({ error: 'missing fields' })
  db.prepare('INSERT INTO analytics_events (event_name, timestamp, class_id, lesson_id, session_key) VALUES (?, ?, ?, ?, ?)')
    .run(eventName, timestamp, classId || null, lessonId || null, sessionKey)
  res.json({ ok: true })
})

app.get('/api/reports/funnel', (_, res) => {
  const rows = db.prepare('SELECT event_name, COUNT(*) as count FROM analytics_events GROUP BY event_name').all()
  res.json(rows)
})

const port = 3001
app.listen(port, () => console.log(`API on ${port}`))
