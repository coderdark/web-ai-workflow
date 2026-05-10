import { create } from 'zustand'

type ProgressState = {
  completed: Record<string, boolean>
  markCompleted: (classId: number, lessonId: number) => void
  isCompleted: (classId: number, lessonId: number) => boolean
}

const key = (classId: number) => `apextuts-progress-${classId}`

export const useProgressStore = create<ProgressState>((set, get) => ({
  completed: {},
  markCompleted: (classId, lessonId) => {
    const k = `${classId}:${lessonId}`
    set((s) => ({ completed: { ...s.completed, [k]: true } }))
    const saved = JSON.parse(localStorage.getItem(key(classId)) || '{}')
    saved[String(lessonId)] = true
    localStorage.setItem(key(classId), JSON.stringify(saved))
  },
  isCompleted: (classId, lessonId) => {
    const inMem = get().completed[`${classId}:${lessonId}`]
    if (inMem) return true
    const saved = JSON.parse(localStorage.getItem(key(classId)) || '{}')
    return Boolean(saved[String(lessonId)])
  }
}))
