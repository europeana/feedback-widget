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

createApp(App, { ...mountElement.dataset })
  .use(i18n)
  .mount(mountSelector)
