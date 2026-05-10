const API = 'http://localhost:3001/api'

export const api = {
  classes: (params: URLSearchParams) => fetch(`${API}/classes?${params.toString()}`).then((r) => r.json()),
  classBySlug: (slug: string) => fetch(`${API}/classes/${slug}`).then((r) => r.json()),
  enroll: (body: { classId: number; firstName: string; email: string }) =>
    fetch(`${API}/enroll`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then((r) => r.json()),
  event: (body: Record<string, unknown>) =>
    fetch(`${API}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
}
