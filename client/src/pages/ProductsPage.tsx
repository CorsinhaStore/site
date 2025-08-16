import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Search, Filter, Star, ShoppingCart } from 'lucide-react'
import { DigitalProduct } from '../../shared/schema.js'
import { formatPrice } from '../lib/utils'
import { defaultFetcher } from '../lib/queryClient'
import { useCart } from '../components/CartProvider'
import { useToast } from '../hooks/use-toast'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const { addItem } = useCart()
  const { toast } = useToast()

  const { data: products, isLoading } = useQuery<DigitalProduct[]>({
    queryKey: ['/api/products', { search: searchQuery, category: selectedCategory }],
    queryFn: () => {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (selectedCategory) params.append('category', selectedCategory)
      return defaultFetcher(`/api/products?${params.toString()}`)
    },
  })

  const { data: categories } = useQuery<string[]>({
    queryKey: ['/api/categories'],
    queryFn: () => defaultFetcher('/api/categories'),
  })

  const filteredProducts = products?.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  ) || []

  const handleAddToCart = (productId: string, productName: string) => {
    addItem(productId, 1)
    toast({
      title: 'Produto adicionado!',
      description: `${productName} foi adicionado ao carrinho.`,
      variant: 'success',
    })
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
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Catálogo de Produtos</h1>
        <p className="text-lg text-muted-foreground">
          Explore nossa coleção completa de produtos digitais premium.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas as categorias</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category] || category}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            R$ {priceRange[0]} - R$ {priceRange[1]}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg border p-4 animate-pulse">
              <div className="h-48 bg-muted rounded-lg mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-4"></div>
              <div className="h-6 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredProducts.length} produto(s) encontrado(s)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-lg border card-hover overflow-hidden">
                <Link href={`/produto/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">(5.0)</span>
                  </div>
                  
                  <Link href={`/produto/${product.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {categoryLabels[product.category] || product.category}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/produto/${product.id}`}
                      className="flex-1 text-center py-2 px-3 border rounded-lg hover:bg-accent transition-colors text-sm"
                    >
                      Detalhes
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product.id, product.name)}
                      className="flex items-center justify-center px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar os filtros ou buscar por outros termos.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('')
              setPriceRange([0, 1000])
            }}
            className="btn-primary"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  )
}