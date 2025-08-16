import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './client/src'),
      '@shared': path.resolve(process.cwd(), './shared'),
      '@assets': path.resolve(process.cwd(), './attached_assets'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
  root: './client',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})