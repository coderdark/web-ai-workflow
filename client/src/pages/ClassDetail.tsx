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
        <div className="h-8 bg-slate-700 rounded w-1/2 animate-pulse mb-4" />
        <div className="h-4 bg-slate-700 rounded w-full animate-pulse mb-2" />
        <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
      </div>
    );
  }

  if (notFound || !cls) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Class not found</h2>
        <Link to="/classes" className="text-indigo-400 hover:underline">← Back to catalog</Link>
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
      <Link to="/classes" className="text-sm text-slate-400 hover:text-indigo-400 mb-6 inline-block">
        ← All Classes
      </Link>

      <div className="flex items-start justify-between gap-4 mb-3">
        <h1 className="text-3xl font-bold text-slate-100">{cls.title}</h1>
        <DifficultyBadge difficulty={cls.difficulty} />
      </div>
      <p className="text-slate-400 mb-8">{cls.description}</p>

      <button
        onClick={handleStart}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-7 py-3 rounded-lg transition-colors mb-10"
      >
        {enrolled ? 'Continue Learning' : 'Start Class'}
      </button>

      <h2 className="text-lg font-semibold text-slate-100 mb-4">
        Lessons <span className="text-slate-500 font-normal text-sm">({lessons.length})</span>
      </h2>
      <ol className="space-y-2">
        {lessons.map((lesson) => {
          const done = progress?.completedLessons.includes(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                to={`/classes/${cls.id}/lessons/${lesson.id}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-indigo-500 bg-slate-700 transition-all"
              >
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${
                  done ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-600 text-slate-400'
                }`}>
                  {done ? '✓' : lesson.order_idx}
                </span>
                <span className={`text-sm ${done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
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
