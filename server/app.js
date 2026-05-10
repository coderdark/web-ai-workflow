import express from 'express';
import cors from 'cors';
import { createClassesRouter } from './routes/classes.js';

export function createApp(db) {
  const app = express();

  app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  }));
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', createClassesRouter(db));

  return app;
}
