import { db, initDb } from '../server/db.js'

initDb()

const classes = [
  {
    slug: 'ai-productivity-basics',
    title: 'AI Productivity Basics',
    short_description: 'Use AI tools to speed up day-to-day work.',
    instructor: 'ApexTuts Team',
    duration: '2h 30m',
    difficulty: 'Beginner',
    topic_tags: 'productivity,ai-tools',
    thumbnail: '/thumbs/productivity.png',
    published: 1,
    is_preview: 0
  },
  {
    slug: 'prompt-writing-preview',
    title: 'Prompt Writing for Teams',
    short_description: 'Preview class for better team prompting.',
    instructor: 'ApexTuts Team',
    duration: '1h 45m',
    difficulty: 'Beginner',
    topic_tags: 'prompting,communication',
    thumbnail: '/thumbs/prompting.png',
    published: 1,
    is_preview: 1
  }
]

const classStmt = db.prepare(`
  INSERT INTO classes (slug, title, short_description, instructor, duration, difficulty, topic_tags, thumbnail, published, is_preview)
  VALUES (@slug, @title, @short_description, @instructor, @duration, @difficulty, @topic_tags, @thumbnail, @published, @is_preview)
  ON CONFLICT(slug) DO UPDATE SET
    title=excluded.title,
    short_description=excluded.short_description,
    instructor=excluded.instructor,
    duration=excluded.duration,
    difficulty=excluded.difficulty,
    topic_tags=excluded.topic_tags,
    thumbnail=excluded.thumbnail,
    published=excluded.published,
    is_preview=excluded.is_preview
`)

for (const c of classes) classStmt.run(c)

const course = db.prepare('SELECT id FROM classes WHERE slug = ?').get('ai-productivity-basics') as { id: number }
if (course) {
  db.prepare('DELETE FROM modules WHERE class_id = ?').run(course.id)
  const m1 = db.prepare('INSERT INTO modules (class_id, title, sort_order) VALUES (?, ?, ?)').run(course.id, 'Getting Started', 1).lastInsertRowid as number
  const m2 = db.prepare('INSERT INTO modules (class_id, title, sort_order) VALUES (?, ?, ?)').run(course.id, 'Practical Workflows', 2).lastInsertRowid as number

  const lessonInsert = db.prepare('INSERT INTO lessons (module_id, title, content, video_url, download_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)')
  lessonInsert.run(m1, 'What AI Can Do for Daily Work', 'Learn practical AI use-cases for your workday.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '/downloads/checklist.pdf', 1)
  lessonInsert.run(m1, 'Choosing the Right Prompt Style', 'Build prompts that match your intent.', '', '', 2)
  lessonInsert.run(m2, 'Email and Meeting Workflow', 'Use AI to draft and refine communication.', '', '', 1)
}

console.log('Seed complete')
