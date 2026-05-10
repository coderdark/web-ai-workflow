import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders with the correct aria attributes', () => {
    render(<ProgressBar pct={60} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '60');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps to 100', () => {
    render(<ProgressBar pct={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps to 0', () => {
    render(<ProgressBar pct={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows percentage text', () => {
    render(<ProgressBar pct={75} />);
    expect(screen.getAllByText('75%').length).toBeGreaterThan(0);
  });
});
