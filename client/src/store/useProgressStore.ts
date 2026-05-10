import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ClassProgress {
  status: 'in_progress' | 'completed';
  enrolledAt: string;
  completedLessons: number[];
}

export interface ClassProgressWithPct extends ClassProgress {
  completionPct: number;
}

interface ProgressState {
  sessionId: string;
  progress: Record<string, ClassProgress>;
  enroll: (classId: number) => void;
  completeLesson: (classId: number, lessonId: number) => void;
  getClassProgress: (classId: number, totalLessons?: number) => ClassProgressWithPct | null;
  getAllProgress: () => Record<string, ClassProgressWithPct>;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      sessionId: crypto.randomUUID(),
      progress: {},

      enroll: (classId) => {
        const key = String(classId);
        if (get().progress[key]) return;
        set((state) => ({
          progress: {
            ...state.progress,
            [key]: {
              status: 'in_progress',
              enrolledAt: new Date().toISOString(),
              completedLessons: [],
            },
          },
        }));
      },

      completeLesson: (classId, lessonId) => {
        const key = String(classId);
        set((state) => {
          const entry = state.progress[key];
          if (!entry) return state;
          if (entry.completedLessons.includes(lessonId)) return state;
          return {
            progress: {
              ...state.progress,
              [key]: {
                ...entry,
                completedLessons: [...entry.completedLessons, lessonId],
              },
            },
          };
        });
      },

      getClassProgress: (classId, totalLessons = 0) => {
        const key = String(classId);
        const entry = get().progress[key];
        if (!entry) return null;

        const completionPct =
          totalLessons > 0
            ? Math.round((entry.completedLessons.length / totalLessons) * 100)
            : 0;

        const status: 'in_progress' | 'completed' =
          totalLessons > 0 && entry.completedLessons.length >= totalLessons
            ? 'completed'
            : 'in_progress';

        return { ...entry, status, completionPct };
      },

      getAllProgress: () => {
        const entries = get().progress;
        const result: Record<string, ClassProgressWithPct> = {};
        for (const [key, entry] of Object.entries(entries)) {
          result[key] = { ...entry, completionPct: 0 };
        }
        return result;
      },
    }),
    {
      name: 'apextuts_progress',
      partialize: (state) => ({
        sessionId: state.sessionId,
        progress: state.progress,
      }),
    }
  )
);
