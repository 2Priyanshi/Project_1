import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,  // This should set the port to 3000
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend API URL
        changeOrigin: true,
        secure: false,
      },
    },

  },
});
