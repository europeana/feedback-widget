import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import { createConfig, defaults } from './config.js'
import * as messages from './locales/index.js'

const mountSelector = '#europeana-feedback-widget'
const config = createConfig(mountSelector)

const i18n = createI18n({
  legacy: false,
  locale: config.locale,
  fallbackLocale: defaults.locale,
  silentFallbackWarn: true,
  globalInjection: true,
  messages
})

createApp(App).provide('config', config).use(i18n).mount(mountSelector)
