import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DifficultyBadge from '../components/DifficultyBadge';

describe('DifficultyBadge', () => {
  it('renders Beginner', () => {
    render(<DifficultyBadge difficulty="Beginner" />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('renders Intermediate', () => {
    render(<DifficultyBadge difficulty="Intermediate" />);
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });

  it('renders Advanced', () => {
    render(<DifficultyBadge difficulty="Advanced" />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });
});
