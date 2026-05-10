import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Class } from '../types';
import DifficultyBadge from '../components/DifficultyBadge';

export default function HomePage() {
  const [featured, setFeatured] = useState<Class | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/classes?featured=1').then((r) => r.json()),
      fetch('/api/classes').then((r) => r.json()),
    ]).then(([feat, all]) => {
      setFeatured(feat);
      setClasses((all as Class[]).slice(0, 3));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-indigo-400 font-medium text-sm mb-3 uppercase tracking-wide">ApexTuts</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 leading-tight mb-4">
            AI Education for Everyone
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-xl">
            No tech background required. Learn artificial intelligence at your own pace with practical, plain-language lessons.
          </p>

          {loading && (
            <div className="h-10 w-48 bg-slate-700 rounded-lg animate-pulse" />
          )}

          {!loading && featured && (
            <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6 max-w-lg shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-indigo-400 font-medium uppercase tracking-wide">Featured Class</span>
                <DifficultyBadge difficulty={featured.difficulty} />
              </div>
              <h2 className="text-xl font-semibold text-slate-100 mb-2">{featured.title}</h2>
              <p className="text-slate-400 text-sm mb-5">{featured.description}</p>
              <Link
                to={`/classes/${featured.id}`}
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                Start Learning
              </Link>
            </div>
          )}

          {!loading && !featured && (
            <div className="text-slate-400">
              No featured class available yet.{' '}
              <Link to="/classes" className="text-indigo-400 hover:underline">Browse all classes →</Link>
            </div>
          )}
        </div>
      </section>

      {/* Browse section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-100">Browse Classes</h2>
          <Link to="/classes" className="text-sm text-indigo-400 hover:underline font-medium">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-slate-700 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <Link
                key={cls.id}
                to={`/classes/${cls.id}`}
                className="block bg-slate-700 rounded-xl border border-slate-600 p-5 hover:border-indigo-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-slate-100 leading-snug">{cls.title}</h3>
                  <DifficultyBadge difficulty={cls.difficulty} />
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">{cls.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
