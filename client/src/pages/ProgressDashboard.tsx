import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Class } from '../types';
import { useProgressStore } from '../store/useProgressStore';
import DifficultyBadge from '../components/DifficultyBadge';
import ProgressBar from '../components/ProgressBar';

interface EnrolledClass {
  cls: Class;
  completedLessons: number[];
  completionPct: number;
  status: 'in_progress' | 'completed';
  firstIncompleteLesson?: number;
}

export default function ProgressDashboard() {
  const getAllProgress = useProgressStore((s) => s.getAllProgress);
  const getClassProgress = useProgressStore((s) => s.getClassProgress);
  const [enrolled, setEnrolled] = useState<EnrolledClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProgress = getAllProgress();
    const classIds = Object.keys(allProgress).map(Number);

    if (classIds.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(classIds.map((cid) => fetch(`/api/classes/${cid}`).then((r) => r.json())))
      .then((classes: Class[]) => {
        const items: EnrolledClass[] = classes.map((cls) => {
          const totalLessons = cls.lessons?.length ?? 0;
          const prog = getClassProgress(cls.id, totalLessons)!;
          const firstIncomplete = cls.lessons?.find(
            (l) => !prog.completedLessons.includes(l.id)
          )?.id;
          return {
            cls,
            completedLessons: prog.completedLessons,
            completionPct: prog.completionPct,
            status: prog.status,
            firstIncompleteLesson: firstIncomplete,
          };
        });
        setEnrolled(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getAllProgress, getClassProgress]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 bg-slate-700 rounded w-1/3 animate-pulse mb-8" />
        <div className="space-y-4">
          {[1, 2].map((i) => <div key={i} className="h-28 bg-slate-700 rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-100 mb-2">My Progress</h1>
      <p className="text-slate-400 mb-10">Track your learning journey.</p>

      {enrolled.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-4">You haven't started any classes yet.</p>
          <Link
            to="/classes"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Browse Classes →
          </Link>
        </div>
      )}

      <div className="space-y-5">
        {enrolled.map(({ cls, completedLessons, completionPct, status, firstIncompleteLesson }) => {
          const totalLessons = cls.lessons?.length ?? 0;
          return (
            <div key={cls.id} className="bg-slate-700 rounded-xl border border-slate-600 p-6">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h2 className="font-semibold text-slate-100">{cls.title}</h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <DifficultyBadge difficulty={cls.difficulty} />
                  {status === 'completed' && (
                    <span className="bg-emerald-900 text-emerald-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                {completedLessons.length} of {totalLessons} lessons complete
              </p>

              <ProgressBar pct={completionPct} />

              {status !== 'completed' && firstIncompleteLesson && (
                <Link
                  to={`/classes/${cls.id}/lessons/${firstIncompleteLesson}`}
                  className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Continue →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
