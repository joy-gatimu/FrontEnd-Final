import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users/': 'http://127.0.0.1:5000', 
      '/users/login/': 'http://127.0.0.1:5000', 
      '/properties/': 'http://127.0.0.1:5000',
      '/bookings/': 'http://127.0.0.1:5000',// Proxy all requests to the Flask server
    },
  },
});