import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database';
import { initializeDatabase } from './config/schema';
import routes from './routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'KASHKHATI Backend is running' });
});

// API routes
app.use('/api', routes);

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection (non-blocking on Vercel)
    try {
      await pool.query('SELECT NOW()');
      console.log('✅ Database connected successfully');
      await initializeDatabase();
    } catch (dbError) {
      console.warn('⚠️ Database not available (ok for serverless without DB env):', (dbError as Error).message);
    }

    // Only listen when not on Vercel serverless
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`🚀 KASHKHATI Backend running on http://localhost:${PORT}`);
        console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
        console.log(`🔗 Frontend: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
      });
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    if (!process.env.VERCEL) process.exit(1);
  }
};

// Auto-init for serverless (don't block export)
if (process.env.VERCEL) {
  pool.query('SELECT NOW()').then(() => initializeDatabase()).catch(() => {});
} else {
  startServer();
}

export default app;
