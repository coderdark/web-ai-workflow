import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lesson, LessonSummary, Class } from '../types';
import { useProgressStore } from '../store/useProgressStore';

export default function LessonViewer() {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [cls, setCls] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);

  const completeLesson = useProgressStore((s) => s.completeLesson);
  const getClassProgress = useProgressStore((s) => s.getClassProgress);
  const enroll = useProgressStore((s) => s.enroll);
  // Direct subscription so the component re-renders when this class's progress changes
  const progressEntry = useProgressStore((s) => s.progress[String(id)] ?? null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/lessons/${lessonId}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`/api/classes/${id}`).then((r) => (r.ok ? r.json() : null)),
    ]).then(([l, c]) => {
      setLesson(l);
      setCls(c);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id, lessonId]);

  // Auto-enroll when viewing a lesson
  useEffect(() => {
    if (id) enroll(Number(id));
  }, [id, enroll]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-6 bg-slate-700 rounded w-2/3 animate-pulse mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-slate-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!lesson || !cls) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Lesson not found</h2>
        <Link to={`/classes/${id}`} className="text-indigo-400 hover:underline">← Back to class</Link>
      </div>
    );
  }

  const lessons: LessonSummary[] = cls.lessons ?? [];
  const sortedLessons = [...lessons].sort((a, b) => a.order_idx - b.order_idx);
  const currentIndex = sortedLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  const progress = getClassProgress(Number(id), lessons.length);
  const isCompleted = progressEntry?.completedLessons.includes(lesson.id) ?? false;

  function handleMarkComplete() {
    completeLesson(Number(id), lesson!.id);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <Link to={`/classes/${id}`} className="text-sm text-slate-400 hover:text-indigo-400 mb-4 inline-block">
            ← {cls.title}
          </Link>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Lessons</h2>
          <ol className="space-y-1">
            {sortedLessons.map((l) => {
              const done = progress?.completedLessons.includes(l.id);
              const active = l.id === lesson.id;
              return (
                <li key={l.id}>
                  <Link
                    to={`/classes/${id}/lessons/${l.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-indigo-900/50 text-indigo-300 font-medium'
                        : 'hover:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <span className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold ${
                      done ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-600 text-slate-400'
                    }`}>
                      {done ? '✓' : l.order_idx}
                    </span>
                    {l.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-8">{lesson.title}</h1>

          <div className="lesson-body max-w-none mb-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
          </div>

          {/* Mark complete */}
          <div className="border-t border-slate-700 pt-8 mb-8">
            <button
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`inline-flex items-center gap-2 font-medium px-6 py-2.5 rounded-lg transition-colors ${
                isCompleted
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
              }`}
            >
              {isCompleted && <span className="text-green-900">✓</span>}
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>

          {/* Prev / Next nav */}
          <div className="flex items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                to={`/classes/${id}/lessons/${prevLesson.id}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
              >
                ← {prevLesson.title}
              </Link>
            ) : <span />}
            {nextLesson && (
              <Link
                to={`/classes/${id}/lessons/${nextLesson.id}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors ml-auto"
              >
                {nextLesson.title} →
              </Link>
            )}
            {!nextLesson && isCompleted && (
              <Link
                to="/progress"
                className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
              >
                View My Progress →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
