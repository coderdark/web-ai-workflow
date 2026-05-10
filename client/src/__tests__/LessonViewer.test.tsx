import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useProgressStore } from '../store/useProgressStore';
import LessonViewer from '../pages/LessonViewer';

const mockLesson = {
  id: 1,
  class_id: 1,
  title: 'What is AI?',
  content: '## What is AI?\n\nArtificial intelligence is...',
  order_idx: 1,
};

const mockClass = {
  id: 1,
  title: 'Intro to AI',
  description: 'A beginner class.',
  difficulty: 'Beginner',
  is_featured: 1,
  lessons: [{ id: 1, title: 'What is AI?', order_idx: 1 }],
};

function renderViewer() {
  return render(
    <MemoryRouter initialEntries={['/classes/1/lessons/1']}>
      <Routes>
        <Route path="/classes/:id/lessons/:lessonId" element={<LessonViewer />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  useProgressStore.setState({ progress: {}, sessionId: 'test-session' });

  vi.stubGlobal('fetch', vi.fn((url: string) => {
    if (url.includes('/api/lessons/')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockLesson) });
    }
    if (url.includes('/api/classes/')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockClass) });
    }
    return Promise.resolve({ ok: false });
  }));
});

describe('LessonViewer — Mark as Complete button', () => {
  it('renders "Mark as Complete" button when lesson is not yet completed', async () => {
    renderViewer();
    const btn = await screen.findByRole('button', { name: /mark as complete/i });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
  });

  it('button is enabled before the lesson is marked complete', async () => {
    renderViewer();
    const btn = await screen.findByRole('button', { name: /mark as complete/i });
    expect(btn).toBeEnabled();
  });

  it('clicking the button disables it immediately', async () => {
    renderViewer();
    const btn = await screen.findByRole('button', { name: /mark as complete/i });
    fireEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('button text changes to "Completed" after clicking', async () => {
    renderViewer();
    const btn = await screen.findByRole('button', { name: /mark as complete/i });
    fireEvent.click(btn);
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('button has green background class after clicking', async () => {
    renderViewer();
    const btn = await screen.findByRole('button', { name: /mark as complete/i });
    fireEvent.click(btn);
    expect(btn.className).toMatch(/bg-green/);
  });

  it('checkmark ✓ is visible after clicking', async () => {
    renderViewer();
    const btn = await screen.findByRole('button', { name: /mark as complete/i });
    fireEvent.click(btn);
    expect(btn.textContent).toContain('✓');
  });

  it('renders in disabled green state on load when lesson was previously completed', async () => {
    useProgressStore.getState().enroll(1);
    useProgressStore.getState().completeLesson(1, 1);
    renderViewer();
    const btn = await screen.findByRole('button', { name: /completed/i });
    expect(btn).toBeDisabled();
    expect(btn.className).toMatch(/bg-green/);
    expect(btn.textContent).toContain('✓');
  });

  it('is a single <button> element in both states — no div swap', async () => {
    renderViewer();
    const btn = await screen.findByRole('button', { name: /mark as complete/i });
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(btn.tagName).toBe('BUTTON');
  });
});
