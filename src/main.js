import { defineCustomElement } from 'vue'

import I18nHost from './components/I18nHost.ce.vue'
import FeedbackWidget from './components/FeedbackWidget.ce.vue'

customElements.define('i18n-host', defineCustomElement(I18nHost))
customElements.define('europeana-feedback-widget', defineCustomElement(FeedbackWidget))
