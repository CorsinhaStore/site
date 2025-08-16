import { DigitalProduct, Order, CartItem } from '../shared/schema.js';

export interface IStorage {
  // Products
  getAllProducts(): Promise<DigitalProduct[]>;
  getProductById(id: string): Promise<DigitalProduct | null>;
  getFeaturedProducts(): Promise<DigitalProduct[]>;
  getProductsByCategory(category: string): Promise<DigitalProduct[]>;
  searchProducts(query: string): Promise<DigitalProduct[]>;
  
  // Orders
  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  updateOrderStatus(id: string, status: Order['status']): Promise<Order | null>;
}

// Sample digital products data
const sampleProducts: DigitalProduct[] = [
  {
    id: '1',
    name: 'Curso Completo de Marketing Digital',
    description: 'Aprenda as estratégias mais eficazes de marketing digital com este curso completo. Inclui módulos sobre SEO, redes sociais, email marketing e muito mais.',
    price: 197.00,
    category: 'courses',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    downloadUrl: '/downloads/marketing-digital-course',
    fileSize: '2.5 GB',
    format: 'MP4 + PDF',
    featured: true,
    tags: ['marketing', 'digital', 'curso', 'negócios'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'E-book: Guia do Empreendedor Digital',
    description: 'Um guia completo para quem quer começar seu negócio digital. Contém estratégias, dicas práticas e cases de sucesso.',
    price: 47.00,
    category: 'ebooks',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    downloadUrl: '/downloads/guia-empreendedor-digital',
    fileSize: '25 MB',
    format: 'PDF',
    featured: true,
    tags: ['empreendedorismo', 'negócios', 'digital'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Template Pack para Instagram',
    description: 'Pacote com 50 templates editáveis para Instagram Stories e Posts. Perfeito para empreendedores e criadores de conteúdo.',
    price: 29.90,
    category: 'templates',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    downloadUrl: '/downloads/instagram-templates',
    fileSize: '120 MB',
    format: 'PSD + Canva',
    featured: false,
    tags: ['templates', 'instagram', 'design', 'social media'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Software de Gestão Financeira',
    description: 'Aplicativo completo para controle financeiro pessoal e empresarial. Interface intuitiva e relatórios detalhados.',
    price: 97.00,
    category: 'software',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    downloadUrl: '/downloads/gestao-financeira-app',
    fileSize: '45 MB',
    format: 'EXE + APK',
    featured: false,
    tags: ['software', 'finanças', 'gestão', 'produtividade'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Pack de Música Royalty Free',
    description: 'Coleção com 100 faixas de música sem direitos autorais para usar em seus projetos, vídeos e apresentações.',
    price: 67.00,
    category: 'music',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    downloadUrl: '/downloads/royalty-free-music',
    fileSize: '1.2 GB',
    format: 'MP3 + WAV',
    featured: false,
    tags: ['música', 'royalty free', 'audio', 'produção'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Curso de Desenvolvimento Web',
    description: 'Aprenda a criar sites e aplicações web do zero. HTML, CSS, JavaScript, React e muito mais.',
    price: 247.00,
    category: 'courses',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    downloadUrl: '/downloads/web-development-course',
    fileSize: '4.8 GB',
    format: 'MP4 + Código',
    featured: true,
    tags: ['programação', 'web', 'desenvolvimento', 'tecnologia'],
    createdAt: new Date().toISOString(),
  },
];

export class MemStorage implements IStorage {
  private products: DigitalProduct[] = sampleProducts;
  private orders: Order[] = [];

  async getAllProducts(): Promise<DigitalProduct[]> {
    return this.products;
  }

  async getProductById(id: string): Promise<DigitalProduct | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async getFeaturedProducts(): Promise<DigitalProduct[]> {
    return this.products.filter(p => p.featured);
  }

  async getProductsByCategory(category: string): Promise<DigitalProduct[]> {
    return this.products.filter(p => p.category === category);
  }

  async searchProducts(query: string): Promise<DigitalProduct[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const order: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orders.find(o => o.id === id) || null;
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      return order;
    }
    return null;
  }
}