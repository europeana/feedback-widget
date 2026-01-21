import { createApp } from 'vue'

import App from './App.vue'

const mountSelector = '#europeana-feedback-widget'

const container = document.querySelector(mountSelector)

createApp(App, container.dataset).mount(mountSelector)
