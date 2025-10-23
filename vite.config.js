import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      name: 'EuropeanaFeedbackWidget',
      fileName: 'europeana-feedback-widget',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'europeana-feedback-widget.[ext]'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silence deprecation warnings until Bootstrap 5 updates Sass: https://github.com/twbs/bootstrap/issues/40962
        silenceDeprecations: ["global-builtin", "import", "color-functions"],
      },
    },
  },
  define: {
    'process.env': {}
  },
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
