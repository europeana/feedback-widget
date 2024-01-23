import { createApp } from 'vue'
import App from './App.vue'

const mountSelector = '#europeana-feedback-widget'
const mountElement = document.querySelector(mountSelector)

// TODO: temporary til we have vue-i18n installed; just returns key
const i18nPlugin = {
  install: (app) => {
    // inject a globally available $t() method
    app.config.globalProperties.$t = (key) => key
  }
}

createApp(App, { ...mountElement.dataset })
  .use(i18nPlugin)
  .mount(mountSelector)
