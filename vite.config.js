import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disabled for production security
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code for better caching
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion', 'aos'],
          'ui-vendor': ['lucide-react', 'react-icons']
        }
      }
    }
  }
})
