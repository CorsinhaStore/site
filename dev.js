import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Basic API routes for testing
  app.get('/api/products', (req, res) => {
    res.json([
      {
        id: '1',
        name: 'Curso Completo de Marketing Digital',
        description: 'Aprenda as estratégias mais eficazes de marketing digital.',
        price: 197.00,
        category: 'courses',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        downloadUrl: '/downloads/marketing-digital-course',
        fileSize: '2.5 GB',
        format: 'MP4 + PDF',
        featured: true,
        tags: ['marketing', 'digital'],
        createdAt: new Date().toISOString(),
      }
    ]);
  });

  app.get('/api/products/featured', (req, res) => {
    res.json([
      {
        id: '1',
        name: 'Curso Completo de Marketing Digital',
        description: 'Aprenda as estratégias mais eficazes de marketing digital.',
        price: 197.00,
        category: 'courses',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        downloadUrl: '/downloads/marketing-digital-course',
        fileSize: '2.5 GB',
        format: 'MP4 + PDF',
        featured: true,
        tags: ['marketing', 'digital'],
        createdAt: new Date().toISOString(),
      }
    ]);
  });

  // Create Vite server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);

  const port = 5173;
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Corsinha Store server running at http://localhost:${port}`);
  });
}

createServer().catch(console.error);