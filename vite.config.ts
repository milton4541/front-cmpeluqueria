import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // La URL de tu backend
        changeOrigin: true, // Cambia el origen de la solicitud
      },
    },
  },
})
