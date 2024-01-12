import { defineCustomElement } from 'vue'

import FeedbackWidget from './components/FeedbackWidget.ce.vue'

customElements.define('europeana-feedback-widget', defineCustomElement(FeedbackWidget))
