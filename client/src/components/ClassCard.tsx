import { Link } from 'react-router-dom';
import { Class } from '../types';
import { ClassProgressWithPct } from '../store/useProgressStore';
import DifficultyBadge from './DifficultyBadge';

interface Props {
  cls: Class;
  progress?: ClassProgressWithPct | null;
}

export default function ClassCard({ cls, progress }: Props) {
  return (
    <Link
      to={`/classes/${cls.id}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-amber-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-stone-900 leading-snug">{cls.title}</h3>
        <DifficultyBadge difficulty={cls.difficulty} />
      </div>

      <p className="text-sm text-stone-600 mb-3 line-clamp-2">{cls.description}</p>

      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>{cls.lesson_count ?? 0} lessons</span>
        {progress && (
          <span className={`font-medium ${progress.status === 'completed' ? 'text-green-700' : 'text-amber-700'}`}>
            {progress.status === 'completed'
              ? '✓ Completed'
              : `In Progress — ${progress.completedLessons.length}/${cls.lesson_count ?? 0} lessons`}
          </span>
        )}
      </div>
    </Link>
  );
}
