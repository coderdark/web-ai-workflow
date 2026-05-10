import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import { Class } from '../types';
import { ClassProgressWithPct } from '../store/useProgressStore';

const mockClass: Class = {
  id: 1,
  title: 'Introduction to AI',
  description: 'Learn the basics of artificial intelligence.',
  difficulty: 'Beginner',
  is_featured: 1,
  lesson_count: 3,
};

function renderCard(progress: ClassProgressWithPct | null = null) {
  return render(
    <MemoryRouter>
      <ClassCard cls={mockClass} progress={progress} />
    </MemoryRouter>
  );
}

describe('ClassCard', () => {
  it('renders class title', () => {
    renderCard();
    expect(screen.getByText('Introduction to AI')).toBeInTheDocument();
  });

  it('renders description', () => {
    renderCard();
    expect(screen.getByText('Learn the basics of artificial intelligence.')).toBeInTheDocument();
  });

  it('renders difficulty badge', () => {
    renderCard();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('renders lesson count', () => {
    renderCard();
    expect(screen.getByText('3 lessons')).toBeInTheDocument();
  });

  it('shows In Progress when enrolled with progress', () => {
    const progress = {
      status: 'in_progress' as const,
      enrolledAt: new Date().toISOString(),
      completedLessons: [1],
      completionPct: 33,
    };
    renderCard(progress);
    expect(screen.getByText(/In Progress/)).toBeInTheDocument();
  });

  it('shows Completed badge when class is done', () => {
    const progress = {
      status: 'completed' as const,
      enrolledAt: new Date().toISOString(),
      completedLessons: [1, 2, 3],
      completionPct: 100,
    };
    renderCard(progress);
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
  });

  it('links to class detail page', () => {
    renderCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/classes/1');
  });
});
