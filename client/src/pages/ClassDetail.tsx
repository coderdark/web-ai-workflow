import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Class, LessonSummary } from '../types';
import { useProgressStore } from '../store/useProgressStore';
import DifficultyBadge from '../components/DifficultyBadge';

export default function ClassDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cls, setCls] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const enroll = useProgressStore((s) => s.enroll);
  const getClassProgress = useProgressStore((s) => s.getClassProgress);

  useEffect(() => {
    fetch(`/api/classes/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) { setCls(data); setLoading(false); }
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 bg-stone-100 rounded w-1/2 animate-pulse mb-4" />
        <div className="h-4 bg-stone-100 rounded w-full animate-pulse mb-2" />
        <div className="h-4 bg-stone-100 rounded w-3/4 animate-pulse" />
      </div>
    );
  }

  if (notFound || !cls) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Class not found</h2>
        <Link to="/classes" className="text-amber-700 hover:underline">← Back to catalog</Link>
      </div>
    );
  }

  const lessons: LessonSummary[] = cls.lessons ?? [];
  const progress = getClassProgress(cls.id, lessons.length);
  const enrolled = !!progress;

  function firstTarget() {
    if (!enrolled) return lessons[0]?.id;
    const incomplete = lessons.find((l) => !progress!.completedLessons.includes(l.id));
    return (incomplete ?? lessons[lessons.length - 1])?.id;
  }

  function handleStart() {
    if (!enrolled) enroll(cls!.id);
    const targetId = firstTarget();
    if (targetId) navigate(`/classes/${cls!.id}/lessons/${targetId}`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/classes" className="text-sm text-stone-500 hover:text-amber-700 mb-6 inline-block">
        ← All Classes
      </Link>

      <div className="flex items-start justify-between gap-4 mb-3">
        <h1 className="text-3xl font-bold text-stone-900">{cls.title}</h1>
        <DifficultyBadge difficulty={cls.difficulty} />
      </div>
      <p className="text-stone-600 mb-8">{cls.description}</p>

      <button
        onClick={handleStart}
        className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-7 py-3 rounded-lg transition-colors mb-10"
      >
        {enrolled ? 'Continue Learning' : 'Start Class'}
      </button>

      <h2 className="text-lg font-semibold text-stone-900 mb-4">
        Lessons <span className="text-stone-400 font-normal text-sm">({lessons.length})</span>
      </h2>
      <ol className="space-y-2">
        {lessons.map((lesson) => {
          const done = progress?.completedLessons.includes(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                to={`/classes/${cls.id}/lessons/${lesson.id}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:border-amber-300 bg-white transition-all"
              >
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${
                  done ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                }`}>
                  {done ? '✓' : lesson.order_idx}
                </span>
                <span className={`text-sm ${done ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                  {lesson.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
