interface Props {
  pct: number;
  label?: string;
}

export default function ProgressBar({ pct, label }: Props) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{label ?? `${clamped}% complete`}</span>
        <span>{clamped}%</span>
      </div>
      <div className="w-full bg-slate-600 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
