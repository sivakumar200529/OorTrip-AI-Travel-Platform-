import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/authRoutes';
import destinationRoutes from './routes/destinationRoutes';
import tripRoutes from './routes/tripRoutes';
import aiRoutes from './routes/aiRoutes';
import experienceRoutes from './routes/experienceRoutes';
import expenseRoutes from './routes/expenseRoutes';
import reviewRoutes from './routes/reviewRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    project: 'OorTrip AI',
    tagline: 'Discover Tamil Nadu. Your Journey, Intelligently Planned.',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static build in production
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('OorTrip AI Backend Server Running.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  OORTRIP AI BACKEND SERVER ACTIVE`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health`);
  console.log(`  AI Engine: ${process.env.GEMINI_API_KEY ? 'Gemini 1.5 Flash' : 'High-Fidelity Regional TN Engine'}`);
  console.log(`====================================================`);
});
