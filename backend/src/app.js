import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { healthRouter } from './routes/healthRoutes.js';
import { reportRouter } from './routes/reportRoutes.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.frontendOrigin,
    methods: ['GET', 'POST', 'PATCH']
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/api/health', healthRouter);
app.use('/api/reports', reportRouter);

app.use((error, _req, res, next) => {
  if (error) {
    return res.status(400).json({ error: error.message || 'Bad request' });
  }

  return next();
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
