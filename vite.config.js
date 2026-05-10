import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteRestart from 'vite-plugin-restart'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteRestart({
      restart: [
        './vite.config.[jt]s',
        './src/**/*'
      ]
    })
  ],
})
