import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users/': 'https://front-end-final-l24aw7oyh-joy-gatimus-projects.vercel.app/', 
      '/users/login/': 'https://front-end-final-l24aw7oyh-joy-gatimus-projects.vercel.app/', 
      '/properties/': 'https://front-end-final-l24aw7oyh-joy-gatimus-projects.vercel.app/',
      '/bookings/': 'https://front-end-final-l24aw7oyh-joy-gatimus-projects.vercel.app/',// Proxy all requests to the Flask server
    },
  },
});