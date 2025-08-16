import { Router, Route, Switch } from 'wouter'
import { ThemeProvider } from './components/ThemeProvider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from './components/Toaster'
import { CartProvider } from './components/CartProvider'

// Pages
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            
            <main className="flex-1">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/produtos" component={ProductsPage} />
                <Route path="/produto/:id" component={ProductPage} />
                <Route path="/sobre" component={AboutPage} />
                <Route path="/contato" component={ContactPage} />
                <Route path="/checkout" component={CheckoutPage} />
                <Route>
                  <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
                    <p className="text-muted-foreground mb-8">
                      A página que você está procurando não existe.
                    </p>
                    <a href="/" className="btn-primary">
                      Voltar ao início
                    </a>
                  </div>
                </Route>
              </Switch>
            </main>
            
            <Footer />
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App