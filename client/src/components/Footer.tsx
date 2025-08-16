import { Link } from 'wouter'
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">Corsinha Store</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Sua loja especializada em produtos digitais de qualidade. 
              Cursos, e-books, templates, software e muito mais com entrega imediata.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Início</Link></li>
              <li><Link href="/produtos" className="hover:text-foreground transition-colors">Produtos</Link></li>
              <li><Link href="/sobre" className="hover:text-foreground transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-foreground transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/produtos?category=courses" className="hover:text-foreground transition-colors">Cursos</Link></li>
              <li><Link href="/produtos?category=ebooks" className="hover:text-foreground transition-colors">E-books</Link></li>
              <li><Link href="/produtos?category=templates" className="hover:text-foreground transition-colors">Templates</Link></li>
              <li><Link href="/produtos?category=software" className="hover:text-foreground transition-colors">Software</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Corsinha Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}