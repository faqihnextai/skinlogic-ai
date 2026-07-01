import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // atau plugin vue/laravel sesuai project Anda

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'tamela-hoary-sid.ngrok-free.dev' // Tambahkan domain ngrok Anda di sini
    ]
  }
})