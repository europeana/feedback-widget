import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import * as messages from './locales/index.js'

const mountSelector = '#europeana-feedback-widget'
const mountElement = document.querySelector(mountSelector)

const configDefaults = {
  apiUrl: 'https://www.europeana.eu/_api/jira-service-desk/feedback',
  locale: 'en'
}
const config = Object.keys(configDefaults).reduce((memo, cKey) => {
  if (Object.hasOwn(mountElement.dataset, cKey)) {
    memo[cKey] = mountElement.dataset[cKey]
  } else {
    memo[cKey] = configDefaults[cKey]
  }
  return memo
}, {})

const i18n = createI18n({
  legacy: false,
  locale: config.locale,
  fallbackLocale: configDefaults.locale,
  silentFallbackWarn: true,
  globalInjection: true,
  messages
})

createApp(App, { ...mountElement.dataset })
  .provide('config', config)
  .use(i18n)
  .mount(mountSelector)
