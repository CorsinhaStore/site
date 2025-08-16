import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { apiRequest } from '../lib/queryClient'
import { ContactForm } from '../../shared/schema.js'

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  })
  const { toast } = useToast()

  const contactMutation = useMutation({
    mutationFn: (data: ContactForm) => apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      toast({
        title: 'Mensagem enviada!',
        description: 'Obrigado pelo contato. Responderemos em breve.',
        variant: 'success',
      })
      setFormData({ name: '', email: '', message: '' })
    },
    onError: () => {
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.',
        variant: 'destructive',
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    contactMutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco e teremos prazer em responder suas dúvidas.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Conte-nos como podemos ajudar..."
                />
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
              >
                {contactMutation.isPending ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">contato@corsinhastore.com</p>
                    <p className="text-sm text-muted-foreground">Respondemos em até 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                    <p className="text-sm text-muted-foreground">Atendimento de 9h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      São Paulo, SP<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Contato Rápido</h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
                <a
                  href="mailto:contato@corsinhastore.com"
                  className="w-full flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </a>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Dúvidas Frequentes</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Como recebo meus produtos?</strong>
                  <p className="text-muted-foreground">
                    Todos os produtos são entregues digitalmente por email após confirmação do pagamento.
                  </p>
                </div>
                <div className="mt-4">
                  <strong>Posso solicitar reembolso?</strong>
                  <p className="text-muted-foreground">
                    Sim, oferecemos garantia de 7 dias para todos os produtos.
                  </p>
                </div>
                <div className="mt-4">
                  <strong>Os produtos têm suporte?</strong>
                  <p className="text-muted-foreground">
                    Sim, oferecemos suporte técnico por email para todos os produtos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}