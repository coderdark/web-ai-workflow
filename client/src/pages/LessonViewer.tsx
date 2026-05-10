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
        <div className="h-6 bg-stone-100 rounded w-2/3 animate-pulse mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-stone-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!lesson || !cls) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Lesson not found</h2>
        <Link to={`/classes/${id}`} className="text-amber-700 hover:underline">← Back to class</Link>
      </div>
    );
  }

  const lessons: LessonSummary[] = cls.lessons ?? [];
  const sortedLessons = [...lessons].sort((a, b) => a.order_idx - b.order_idx);
  const currentIndex = sortedLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  const progress = getClassProgress(Number(id), lessons.length);
  const isCompleted = progress?.completedLessons.includes(lesson.id) ?? false;

  function handleMarkComplete() {
    completeLesson(Number(id), lesson!.id);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <Link to={`/classes/${id}`} className="text-sm text-stone-500 hover:text-amber-700 mb-4 inline-block">
            ← {cls.title}
          </Link>
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">Lessons</h2>
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
                        ? 'bg-amber-100 text-amber-800 font-medium'
                        : 'hover:bg-stone-100 text-stone-600'
                    }`}
                  >
                    <span className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold ${
                      done ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-500'
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
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{lesson.title}</h1>

          <div className="prose prose-stone max-w-none mb-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
          </div>

          {/* Mark complete */}
          <div className="border-t border-stone-200 pt-8 mb-8">
            {isCompleted ? (
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-5 py-2.5 rounded-lg font-medium">
                <span>✓</span> Completed
              </div>
            ) : (
              <button
                onClick={handleMarkComplete}
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                Mark as Complete
              </button>
            )}
          </div>

          {/* Prev / Next nav */}
          <div className="flex items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                to={`/classes/${id}/lessons/${prevLesson.id}`}
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700 transition-colors"
              >
                ← {prevLesson.title}
              </Link>
            ) : <span />}
            {nextLesson && (
              <Link
                to={`/classes/${id}/lessons/${nextLesson.id}`}
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700 transition-colors ml-auto"
              >
                {nextLesson.title} →
              </Link>
            )}
            {!nextLesson && isCompleted && (
              <Link
                to={`/progress`}
                className="flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors ml-auto"
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
