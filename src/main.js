import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import * as messages from './locales/index.js'

const mountSelector = '#europeana-feedback-widget'
const mountElement = document.querySelector(mountSelector)

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
