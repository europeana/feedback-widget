import { defineCustomElement } from 'vue'

import FeedbackWidget from './components/FeedbackWidget.ce.vue'
import I18nHost from './components/I18nHost.ce.vue'
import Feedbackbutton from './components/FeedbackButton.ce.vue'


customElements.define('europeana-feedback-widget', defineCustomElement(FeedbackWidget))
customElements.define('europeana-i18n-host', defineCustomElement(I18nHost))
customElements.define('europeana-feedback-button', defineCustomElement(Feedbackbutton))
