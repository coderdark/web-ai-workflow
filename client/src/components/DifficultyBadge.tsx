interface Props {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const styles: Record<Props['difficulty'], string> = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-amber-100 text-amber-800',
  Advanced: 'bg-red-100 text-red-800',
};

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
