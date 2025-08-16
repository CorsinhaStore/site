import express from 'express';
import { IStorage } from './storage.js';
import { digitalProductSchema, orderSchema, contactFormSchema, productFilterSchema } from '../shared/schema.js';

export function createApiRoutes(storage: IStorage) {
  const router = express.Router();

  // Get all products with optional filtering
  router.get('/products', async (req, res) => {
    try {
      const filterResult = productFilterSchema.safeParse(req.query);
      if (!filterResult.success) {
        return res.status(400).json({ error: 'Invalid filter parameters' });
      }

      const { category, minPrice, maxPrice, search } = filterResult.data;
      let products = await storage.getAllProducts();

      // Apply filters
      if (category) {
        products = await storage.getProductsByCategory(category);
      }
      if (search) {
        products = await storage.searchProducts(search);
      }
      if (minPrice !== undefined) {
        products = products.filter(p => p.price >= minPrice);
      }
      if (maxPrice !== undefined) {
        products = products.filter(p => p.price <= maxPrice);
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // Get featured products
  router.get('/products/featured', async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch featured products' });
    }
  });

  // Get product by ID
  router.get('/products/:id', async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  // Get products by category
  router.get('/categories/:category/products', async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products by category' });
    }
  });

  // Create order
  router.post('/orders', async (req, res) => {
    try {
      const orderResult = orderSchema.omit({ id: true, createdAt: true }).safeParse(req.body);
      if (!orderResult.success) {
        return res.status(400).json({ error: 'Invalid order data', details: orderResult.error.issues });
      }

      const order = await storage.createOrder(orderResult.data);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  // Get order by ID
  router.get('/orders/:id', async (req, res) => {
    try {
      const order = await storage.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  });

  // Update order status
  router.patch('/orders/:id/status', async (req, res) => {
    try {
      const { status } = req.body;
      if (!['pending', 'completed', 'failed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order status' });
    }
  });

  // Contact form submission
  router.post('/contact', async (req, res) => {
    try {
      const contactResult = contactFormSchema.safeParse(req.body);
      if (!contactResult.success) {
        return res.status(400).json({ error: 'Invalid contact data', details: contactResult.error.issues });
      }

      // In a real application, you would send the email here
      // For now, we'll just return success
      res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  // Get available categories
  router.get('/categories', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      const categories = [...new Set(products.map(p => p.category))];
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  return router;
}