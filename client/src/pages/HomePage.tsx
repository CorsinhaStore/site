import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { ArrowRight, Star, Download, Users, Shield } from 'lucide-react'
import { DigitalProduct } from '../../shared/schema.js'
import { formatPrice } from '../lib/utils'
import { defaultFetcher } from '../lib/queryClient'

export default function HomePage() {
  const { data: featuredProducts, isLoading } = useQuery<DigitalProduct[]>({
    queryKey: ['/api/products/featured'],
    queryFn: () => defaultFetcher('/api/products/featured'),
  })

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Produtos Digitais de
            <span className="block text-yellow-300">Qualidade Premium</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Descubra cursos, e-books, templates, software e muito mais. 
            Entrega imediata e preços que cabem no seu bolso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/produtos" className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Ver Catálogo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/sobre" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Sobre Nós
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border">
              <Download className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Entrega Imediata</h3>
              <p className="text-muted-foreground">
                Receba seus produtos digitais instantaneamente após a compra.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Seguro</h3>
              <p className="text-muted-foreground">
                Pagamentos seguros e garantia de satisfação em todos os produtos.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Suporte Completo</h3>
              <p className="text-muted-foreground">
                Atendimento personalizado para tirar todas as suas dúvidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Selecionamos os melhores produtos digitais para impulsionar seu crescimento pessoal e profissional.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg border p-6 animate-pulse">
                  <div className="h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts?.map((product) => (
                <div key={product.id} className="bg-card rounded-lg border card-hover overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">(5.0)</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <Link
                        href={`/produto/${product.id}`}
                        className="btn-primary"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/produtos" className="btn-primary">
              Ver Todos os Produtos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para transformar seu conhecimento?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a milhares de pessoas que já transformaram suas vidas com nossos produtos digitais.
            </p>
            <Link href="/produtos" className="btn-primary text-lg px-8 py-4">
              Começar Agora <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}