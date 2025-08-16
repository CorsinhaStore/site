import { Link } from 'wouter'
import { Users, Target, Heart, Award, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a Corsinha Store</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos apaixonados por democratizar o acesso ao conhecimento através de produtos digitais de alta qualidade.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Acreditamos que o conhecimento deve ser acessível a todos. Nossa missão é fornecer produtos digitais 
                de qualidade premium a preços justos, ajudando pessoas a transformarem suas vidas pessoais e profissionais.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Trabalhamos com os melhores criadores de conteúdo para oferecer cursos, e-books, templates, 
                software e outros produtos digitais que realmente fazem a diferença.
              </p>
              <Link href="/produtos" className="btn-primary">
                Explorar Produtos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Equipe trabalhando"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam tudo o que fazemos na Corsinha Store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Qualidade</h3>
              <p className="text-muted-foreground">
                Selecionamos apenas produtos que atendem aos mais altos padrões de qualidade.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Comunidade</h3>
              <p className="text-muted-foreground">
                Criamos uma comunidade de aprendizado onde todos podem crescer juntos.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Foco</h3>
              <p className="text-muted-foreground">
                Focamos em resultados práticos que realmente impactam a vida das pessoas.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Paixão</h3>
              <p className="text-muted-foreground">
                Fazemos tudo com amor e dedicação, pensando sempre no sucesso dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Números</h2>
            <p className="text-xl text-muted-foreground">
              Resultados que comprovam nossa dedicação e qualidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Produtos Digitais</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24h</div>
              <div className="text-muted-foreground">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Profissionais apaixonados por educação e tecnologia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card border">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="CEO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Maria Silva</h3>
              <p className="text-primary font-medium mb-2">CEO & Fundadora</p>
              <p className="text-sm text-muted-foreground">
                15 anos de experiência em educação digital e empreendedorismo.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="CTO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">João Santos</h3>
              <p className="text-primary font-medium mb-2">CTO</p>
              <p className="text-sm text-muted-foreground">
                Especialista em tecnologia e desenvolvimento de plataformas digitais.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b593?w=150&h=150&fit=crop&crop=face"
                alt="Head de Conteúdo"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Ana Costa</h3>
              <p className="text-primary font-medium mb-2">Head de Conteúdo</p>
              <p className="text-sm text-muted-foreground">
                Responsável pela curadoria e qualidade dos nossos produtos digitais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Faça parte da nossa história
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a milhares de pessoas que já transformaram suas vidas com nossos produtos digitais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produtos" className="btn-primary">
                Explorar Produtos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/contato" className="btn-secondary">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}