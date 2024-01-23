import { createApp } from 'vue'

const mountSelector = '#europeana-feedback-widget'

import App from './App.vue'

const mountElement = document.querySelector(mountSelector)

createApp(App, { ...mountElement.dataset }).mount(mountSelector)
