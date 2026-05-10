import { create } from 'zustand'

type SessionState = { sessionKey: string }

const getSessionKey = () => {
  const existing = localStorage.getItem('apextuts-session-key')
  if (existing) return existing
  const generated = `sess-${Math.random().toString(36).slice(2)}`
  localStorage.setItem('apextuts-session-key', generated)
  return generated
}

export const useSessionStore = create<SessionState>(() => ({ sessionKey: getSessionKey() }))
