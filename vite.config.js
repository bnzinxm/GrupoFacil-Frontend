import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5501',
        changeOrigin: true,
        secure: false, // Apenas se estiver usando HTTPS no backend
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});