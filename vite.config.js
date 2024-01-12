import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      name: 'EuropeanaFeedbackWidget',
      fileName: 'europeana-feedback-widget',
    }
  },
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
