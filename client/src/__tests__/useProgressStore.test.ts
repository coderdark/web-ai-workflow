import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore } from '../store/useProgressStore';

beforeEach(() => {
  useProgressStore.setState({ progress: {}, sessionId: 'test-session' });
});

describe('useProgressStore', () => {
  it('has a sessionId on creation', () => {
    const { sessionId } = useProgressStore.getState();
    expect(sessionId).toBeTruthy();
  });

  it('enroll adds a class entry with in_progress status', () => {
    useProgressStore.getState().enroll(1);
    const progress = useProgressStore.getState().progress;
    expect(progress['1']).toBeDefined();
    expect(progress['1'].status).toBe('in_progress');
    expect(progress['1'].completedLessons).toEqual([]);
  });

  it('enroll is idempotent — does not overwrite existing progress', () => {
    useProgressStore.getState().enroll(1);
    useProgressStore.getState().completeLesson(1, 10);
    useProgressStore.getState().enroll(1); // enroll again
    const progress = useProgressStore.getState().progress['1'];
    expect(progress.completedLessons).toContain(10);
  });

  it('completeLesson adds a lessonId', () => {
    useProgressStore.getState().enroll(1);
    useProgressStore.getState().completeLesson(1, 5);
    expect(useProgressStore.getState().progress['1'].completedLessons).toContain(5);
  });

  it('completeLesson is idempotent', () => {
    useProgressStore.getState().enroll(1);
    useProgressStore.getState().completeLesson(1, 5);
    useProgressStore.getState().completeLesson(1, 5);
    expect(useProgressStore.getState().progress['1'].completedLessons).toHaveLength(1);
  });

  it('getClassProgress returns null for unenrolled class', () => {
    const result = useProgressStore.getState().getClassProgress(99);
    expect(result).toBeNull();
  });

  it('getClassProgress returns progress with completionPct', () => {
    useProgressStore.getState().enroll(1);
    useProgressStore.getState().completeLesson(1, 1);
    useProgressStore.getState().completeLesson(1, 2);
    const result = useProgressStore.getState().getClassProgress(1, 4);
    expect(result).not.toBeNull();
    expect(result!.completionPct).toBe(50);
    expect(result!.status).toBe('in_progress');
  });

  it('getClassProgress marks class as completed when all lessons done', () => {
    useProgressStore.getState().enroll(2);
    useProgressStore.getState().completeLesson(2, 10);
    useProgressStore.getState().completeLesson(2, 11);
    const result = useProgressStore.getState().getClassProgress(2, 2);
    expect(result!.status).toBe('completed');
    expect(result!.completionPct).toBe(100);
  });

  it('getAllProgress returns all enrolled classes', () => {
    useProgressStore.getState().enroll(1);
    useProgressStore.getState().enroll(2);
    const all = useProgressStore.getState().getAllProgress();
    expect(Object.keys(all)).toHaveLength(2);
    expect(all['1']).toBeDefined();
    expect(all['2']).toBeDefined();
  });
});
