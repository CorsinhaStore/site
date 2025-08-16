import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

// Digital Product schema for JSON-based storage
export const digitalProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.enum(['ebooks', 'courses', 'software', 'templates', 'music', 'videos']),
  imageUrl: z.string().url(),
  downloadUrl: z.string().url(),
  fileSize: z.string().optional(),
  format: z.string().optional(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().datetime(),
});

export type DigitalProduct = z.infer<typeof digitalProductSchema>;

// Cart item schema
export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().positive().default(1),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Order schema
export const orderSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema),
  totalAmount: z.number().positive(),
  customerEmail: z.string().email(),
  customerName: z.string(),
  status: z.enum(['pending', 'completed', 'failed']),
  paymentMethod: z.enum(['pix', 'mercadopago', 'stripe']),
  createdAt: z.string().datetime(),
});

export type Order = z.infer<typeof orderSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Filter schema for products
export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  search: z.string().optional(),
});

export type ProductFilter = z.infer<typeof productFilterSchema>;