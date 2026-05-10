import { useEffect, useState } from 'react';
import { Class } from '../types';
import { useProgressStore } from '../store/useProgressStore';
import ClassCard from '../components/ClassCard';

export default function ClassCatalog() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const getClassProgress = useProgressStore((s) => s.getClassProgress);

  useEffect(() => {
    fetch('/api/classes')
      .then((r) => r.json())
      .then((data: Class[]) => {
        setClasses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-100 mb-2">All Classes</h1>
      <p className="text-slate-400 mb-10">Browse our full library of AI courses.</p>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-slate-700 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!loading && classes.length === 0 && (
        <p className="text-slate-400 text-center py-20">No classes available yet. Check back soon!</p>
      )}

      {!loading && classes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              progress={getClassProgress(cls.id, cls.lesson_count)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
