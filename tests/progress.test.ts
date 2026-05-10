import { describe, it, expect, beforeEach } from 'vitest'
import { useProgressStore } from '../src/store/progress'

describe('progress store', () => {
  beforeEach(() => {
    localStorage.clear()
    useProgressStore.setState({ completed: {}, markCompleted: useProgressStore.getState().markCompleted, isCompleted: useProgressStore.getState().isCompleted })
  })

  it('persists completion in localStorage', () => {
    useProgressStore.getState().markCompleted(1, 10)
    expect(useProgressStore.getState().isCompleted(1, 10)).toBe(true)
    const persisted = JSON.parse(localStorage.getItem('apextuts-progress-1') || '{}')
    expect(persisted['10']).toBe(true)
  })
})
