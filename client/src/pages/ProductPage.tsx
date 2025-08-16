import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Star, Download, ShoppingCart, ArrowLeft, FileText, Clock } from 'lucide-react'
import { DigitalProduct } from '../../shared/schema.js'
import { formatPrice } from '../lib/utils'
import { defaultFetcher } from '../lib/queryClient'
import { useCart } from '../components/CartProvider'
import { useToast } from '../hooks/use-toast'

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const { data: product, isLoading, error } = useQuery<DigitalProduct>({
    queryKey: ['/api/products', params.id],
    queryFn: () => defaultFetcher(`/api/products/${params.id}`),
  })

  const handleAddToCart = () => {
    if (product) {
      addItem(product.id, 1)
      toast({
        title: 'Produto adicionado!',
        description: `${product.name} foi adicionado ao carrinho.`,
        variant: 'success',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-6 bg-muted rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <p className="text-muted-foreground mb-8">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Link href="/produtos" className="btn-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar aos Produtos
        </Link>
      </div>
    )
  }

  const categoryLabels: Record<string, string> = {
    'courses': 'Cursos',
    'ebooks': 'E-books', 
    'templates': 'Templates',
    'software': 'Software',
    'music': 'Música',
    'videos': 'Vídeos',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/produtos" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar aos Produtos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="space-y-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {categoryLabels[product.category] || product.category}
              </span>
              {product.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Destaque
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-muted-foreground">(5.0) • 127 avaliações</span>
            </div>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center">
              <Download className="h-5 w-5 text-primary mr-2" />
              <div>
                <div className="font-medium">Tamanho</div>
                <div className="text-sm text-muted-foreground">{product.fileSize}</div>
              </div>
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <div>
                <div className="font-medium">Formato</div>
                <div className="text-sm text-muted-foreground">{product.format}</div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price and Purchase */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pagamento único • Acesso vitalício
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </button>
              <Link
                href="/checkout"
                className="w-full btn-secondary text-center block"
              >
                Comprar Agora
              </Link>
            </div>

            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center text-green-700 dark:text-green-400">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  Entrega imediata após confirmação do pagamento
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Sobre este produto</h2>
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-muted-foreground">
            {product.description}
          </p>
          <h3>O que você vai receber:</h3>
          <ul>
            <li>Acesso completo ao conteúdo digital</li>
            <li>Downloads ilimitados</li>
            <li>Suporte técnico por email</li>
            <li>Atualizações gratuitas quando disponíveis</li>
          </ul>
          <h3>Garantia de Satisfação</h3>
          <p>
            Oferecemos garantia de 7 dias. Se você não ficar satisfeito com o produto,
            devolvemos 100% do seu dinheiro.
          </p>
        </div>
      </div>
    </div>
  )
}