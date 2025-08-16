import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApiRoutes } from './routes.js';
import { MemStorage } from './storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();
  const storage = new MemStorage();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API routes
  app.use('/api', createApiRoutes(storage));

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }

  const port = process.env.PORT || 5173;
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Corsinha Store server running at http://localhost:${port}`);
  });
}

createServer().catch(console.error);