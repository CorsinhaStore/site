import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

// Set up global fetch defaults for API requests
const originalFetch = window.fetch
window.fetch = async (url, options = {}) => {
  if (typeof url === 'string' && url.startsWith('/api')) {
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  }
  return originalFetch(url, options)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)