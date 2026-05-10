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
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-amber-700 font-medium text-sm mb-3 uppercase tracking-wide">ApexTuts</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            AI Education for Everyone
          </h1>
          <p className="text-xl text-stone-600 mb-10 max-w-xl">
            No tech background required. Learn artificial intelligence at your own pace with practical, plain-language lessons.
          </p>

          {loading && (
            <div className="h-10 w-48 bg-stone-200 rounded-lg animate-pulse" />
          )}

          {!loading && featured && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-amber-700 font-medium uppercase tracking-wide">Featured Class</span>
                <DifficultyBadge difficulty={featured.difficulty} />
              </div>
              <h2 className="text-xl font-semibold text-stone-900 mb-2">{featured.title}</h2>
              <p className="text-stone-600 text-sm mb-5">{featured.description}</p>
              <Link
                to={`/classes/${featured.id}`}
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                Start Learning
              </Link>
            </div>
          )}

          {!loading && !featured && (
            <div className="text-stone-500">
              No featured class available yet.{' '}
              <Link to="/classes" className="text-amber-700 hover:underline">Browse all classes →</Link>
            </div>
          )}
        </div>
      </section>

      {/* Browse section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900">Browse Classes</h2>
          <Link to="/classes" className="text-sm text-amber-700 hover:underline font-medium">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-stone-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <Link
                key={cls.id}
                to={`/classes/${cls.id}`}
                className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-stone-900 leading-snug">{cls.title}</h3>
                  <DifficultyBadge difficulty={cls.difficulty} />
                </div>
                <p className="text-sm text-stone-600 line-clamp-2">{cls.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
