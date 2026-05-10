interface Props {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const styles: Record<Props['difficulty'], string> = {
  Beginner:     'bg-emerald-900 text-emerald-300',
  Intermediate: 'bg-indigo-900 text-indigo-300',
  Advanced:     'bg-red-900 text-red-300',
};

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
