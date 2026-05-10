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
  it('returns an array of classes with lesson_count', async () => {
    const res = await request(app).get('/api/classes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('lesson_count');
    expect(res.body[0].lesson_count).toBe(3);
  });

  it('returns only the featured class when ?featured=1', async () => {
    const res = await request(app).get('/api/classes?featured=1');
    expect(res.status).toBe(200);
    expect(res.body).not.toBeNull();
    expect(res.body.is_featured).toBe(1);
  });
});

describe('GET /api/classes/:id', () => {
  it('returns a class with a lessons array', async () => {
    const res = await request(app).get('/api/classes/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title');
    expect(Array.isArray(res.body.lessons)).toBe(true);
    expect(res.body.lessons.length).toBe(3);
    expect(res.body.lessons[0]).toHaveProperty('order_idx');
    expect(res.body.lessons[0]).not.toHaveProperty('content');
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
