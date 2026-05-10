import { Router } from 'express';

export function createClassesRouter(db) {
  const router = Router();

  router.get('/classes', (req, res) => {
    if (req.query.featured === '1') {
      const cls = db.prepare(`
        SELECT c.*, COUNT(l.id) as lesson_count
        FROM classes c
        LEFT JOIN lessons l ON l.class_id = c.id
        WHERE c.is_featured = 1
        GROUP BY c.id
        LIMIT 1
      `).get();
      return res.json(cls || null);
    }

    const classes = db.prepare(`
      SELECT c.*, COUNT(l.id) as lesson_count
      FROM classes c
      LEFT JOIN lessons l ON l.class_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).all();

    res.json(classes);
  });

  router.get('/classes/:id', (req, res) => {
    const cls = db.prepare('SELECT * FROM classes WHERE id = ?').get(req.params.id);
    if (!cls) return res.status(404).json({ error: 'Not found' });

    const lessons = db.prepare(`
      SELECT id, title, order_idx FROM lessons
      WHERE class_id = ?
      ORDER BY order_idx ASC
    `).all(req.params.id);

    res.json({ ...cls, lessons });
  });

  router.get('/lessons/:id', (req, res) => {
    const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Not found' });
    res.json(lesson);
  });

  return router;
}
