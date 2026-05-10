export interface Class {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  is_featured: number;
  lesson_count?: number;
  lessons?: LessonSummary[];
  created_at?: string;
}

export interface LessonSummary {
  id: number;
  title: string;
  order_idx: number;
}

export interface Lesson extends LessonSummary {
  class_id: number;
  content: string;
  created_at?: string;
}
