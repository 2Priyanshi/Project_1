import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server: {
    port: 3000, // Frontend server port
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring Boot backend
=======

  server: {
    port: 3000,  // This should set the port to 3000
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend API URL
>>>>>>> ebac1a9f2e2faf3937438355d61db11412d32deb
        changeOrigin: true,
        secure: false,
      },
    },
<<<<<<< HEAD
=======

>>>>>>> ebac1a9f2e2faf3937438355d61db11412d32deb
  },
});
