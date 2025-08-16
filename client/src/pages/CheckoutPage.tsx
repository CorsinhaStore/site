import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Trash2, Plus, Minus, CreditCard, Smartphone, ShoppingBag } from 'lucide-react'
import { DigitalProduct } from '../../shared/schema.js'
import { formatPrice } from '../lib/utils'
import { defaultFetcher, apiRequest } from '../lib/queryClient'
import { useCart } from '../components/CartProvider'
import { useToast } from '../hooks/use-toast'

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const { toast } = useToast()
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    paymentMethod: 'pix' as 'pix' | 'mercadopago' | 'stripe',
  })

  // Fetch product details for cart items
  const { data: products, isLoading } = useQuery<DigitalProduct[]>({
    queryKey: ['/api/products'],
    queryFn: () => defaultFetcher('/api/products'),
    enabled: items.length > 0,
  })

  const orderMutation = useMutation({
    mutationFn: (orderData: any) => apiRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
    onSuccess: (order) => {
      toast({
        title: 'Pedido realizado!',
        description: `Pedido #${order.id} criado com sucesso. Verifique seu email.`,
        variant: 'success',
      })
      clearCart()
    },
    onError: () => {
      toast({
        title: 'Erro no pedido',
        description: 'Ocorreu um erro ao processar seu pedido. Tente novamente.',
        variant: 'destructive',
      })
    },
  })

  const cartProducts = products?.filter(product => 
    items.some(item => item.productId === product.id)
  ) || []

  const getCartItemDetails = (productId: string) => {
    const product = cartProducts.find(p => p.id === productId)
    const cartItem = items.find(item => item.productId === productId)
    return { product, quantity: cartItem?.quantity || 0 }
  }

  const getTotalAmount = () => {
    return items.reduce((total, item) => {
      const product = cartProducts.find(p => p.id === item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!customerInfo.name || !customerInfo.email) {
      toast({
        title: 'Informações incompletas',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    if (items.length === 0) {
      toast({
        title: 'Carrinho vazio',
        description: 'Adicione produtos ao carrinho antes de finalizar o pedido.',
        variant: 'destructive',
      })
      return
    }

    const orderData = {
      items,
      totalAmount: getTotalAmount(),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      paymentMethod: customerInfo.paymentMethod,
      status: 'pending' as const,
    }

    orderMutation.mutate(orderData)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-8">
          Adicione alguns produtos incríveis ao seu carrinho para continuar.
        </p>
        <Link href="/produtos" className="btn-primary">
          Explorar Produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Itens do Carrinho</h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 bg-muted rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const { product, quantity } = getCartItemDetails(item.productId)
                  if (!product) return null

                  return (
                    <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(product.price)} × {quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, quantity - 1)}
                          className="p-1 rounded hover:bg-accent"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, quantity + 1)}
                          className="p-1 rounded hover:bg-accent"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatPrice(product.price * quantity)}
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Suas Informações</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-accent">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={customerInfo.paymentMethod === 'pix'}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                  className="mr-3"
                />
                <Smartphone className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <div className="font-medium">PIX</div>
                  <div className="text-sm text-muted-foreground">Aprovação instantânea</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-accent">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mercadopago"
                  checked={customerInfo.paymentMethod === 'mercadopago'}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                  className="mr-3"
                />
                <CreditCard className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <div className="font-medium">Mercado Pago</div>
                  <div className="text-sm text-muted-foreground">Cartão de crédito ou débito</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(getTotalAmount())}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Desconto:</span>
                <span>R$ 0,00</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">{formatPrice(getTotalAmount())}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={orderMutation.isPending || items.length === 0}
              className="w-full btn-primary disabled:opacity-50"
            >
              {orderMutation.isPending ? 'Processando...' : 'Finalizar Compra'}
            </button>

            <div className="mt-4 text-xs text-muted-foreground text-center">
              <p>✓ Entrega imediata por email</p>
              <p>✓ Garantia de 7 dias</p>
              <p>✓ Suporte incluído</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}