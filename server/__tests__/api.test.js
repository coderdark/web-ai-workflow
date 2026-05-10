import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import Database from 'better-sqlite3';
import { createSchema, seedTestData } from '../db/init.js';
import { createApp } from '../app.js';

let app;

beforeAll(() => {
  const db = new Database(':memory:');
  createSchema(db);
  seedTestData(db);
  app = createApp(db);
});

describe('GET /api/health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/classes', () => {
  it('returns all 3 classes with lesson_count', async () => {
    const res = await request(app).get('/api/classes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
    res.body.forEach((cls) => expect(cls.lesson_count).toBe(3));
  });

  it('returns only the featured class when ?featured=1', async () => {
    const res = await request(app).get('/api/classes?featured=1');
    expect(res.status).toBe(200);
    expect(res.body).not.toBeNull();
    expect(res.body.is_featured).toBe(1);
  });
});

describe('GET /api/classes/:id', () => {
  it('returns the AI class with a lessons array', async () => {
    const res = await request(app).get('/api/classes/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Test AI Class');
    expect(Array.isArray(res.body.lessons)).toBe(true);
    expect(res.body.lessons.length).toBe(3);
    expect(res.body.lessons[0]).toHaveProperty('order_idx');
    expect(res.body.lessons[0]).not.toHaveProperty('content');
  });

  it('returns the "What is a Skill?" class with correct difficulty and lessons', async () => {
    const res = await request(app).get('/api/classes/2');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('What is a Skill?');
    expect(res.body.difficulty).toBe('Beginner');
    expect(res.body.lessons.length).toBe(3);
    const titles = res.body.lessons.map((l) => l.title);
    expect(titles).toContain('Skills: Giving AI a Toolbox');
    expect(titles).toContain('How Skills Work Under the Hood');
    expect(titles).toContain('Using Skills Effectively');
  });

  it('returns the "What is an Agent?" class with correct difficulty and lessons', async () => {
    const res = await request(app).get('/api/classes/3');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('What is an Agent?');
    expect(res.body.difficulty).toBe('Intermediate');
    expect(res.body.lessons.length).toBe(3);
    const titles = res.body.lessons.map((l) => l.title);
    expect(titles).toContain('From Chatbot to Agent: What Changed');
    expect(titles).toContain('How an Agent Thinks and Acts');
    expect(titles).toContain('Agents in the Real World');
  });

  it('returns 404 for a non-existent class', async () => {
    const res = await request(app).get('/api/classes/9999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not found' });
  });
});

describe('GET /api/lessons/:id', () => {
  it('returns a lesson with content', async () => {
    const res = await request(app).get('/api/lessons/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('content');
    expect(res.body).toHaveProperty('class_id');
    expect(res.body).toHaveProperty('order_idx');
  });

  it('returns 404 for a non-existent lesson', async () => {
    const res = await request(app).get('/api/lessons/9999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not found' });
  });
});
