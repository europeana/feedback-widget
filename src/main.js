import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

const mountSelector = '#europeana-feedback-widget'

import App from './App.vue'

const mountElement = document.querySelector(mountSelector)

import * as messages from './locales/index.js'

const i18n = createI18n({
  legacy: false,
  locale: mountElement.dataset.locale,
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  globalInjection: true,
  messages
})

const app = createApp(App, { ...mountElement.dataset })
app.use(i18n)
app.mount(mountSelector)
