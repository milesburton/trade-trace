import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { setupDatabase, closeDatabase } from './db/setup.js';
import { seedDatabase } from './db/seed.js';
import authRouter from './routes/auth.js';
import tradesmemRouter from './routes/tradesmen.js';
import reviewsRouter from './routes/reviews.js';

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${ms}ms`);
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/tradesmen', tradesmemRouter);
app.use('/api/reviews', reviewsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404,
  });
});

// Initialize database and start server
async function startServer() {
  try {
    await setupDatabase();
    console.log('✅ Database initialized');

    // Seed demo data if SEED_DB env var is set
    if (config.seed_db) {
      await seedDatabase();
    }
  } catch (err) {
    console.error('❌ Database initialization failed:', err);
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server starting on http://localhost:${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(async () => {
      await closeDatabase();
      process.exit(0);
    });
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(async () => {
      await closeDatabase();
      process.exit(0);
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
