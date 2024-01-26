<script setup>
import { ref } from 'vue'

const feedback = defineModel()

const feedbackTextarea = ref(null)

const wordLength = (text) => text?.trim()?.match(/\w+/g)?.length || 0

const handleInputFeedback = () => {
  if (wordLength(feedback.value) < 5) {
    // TODO: i18n
    feedbackTextarea.value.setCustomValidity('Your feedback has to consist of 5 words at minimum')
  } else {
    feedbackTextarea.value.setCustomValidity('')
  }
}
</script>

<template>
  <textarea
    v-model="feedback"
    id="feedback-widget-feedback-input"
    class="form-control"
    ref="feedbackTextarea"
    autofocus
    required
    name="feedback"
    :placeholder="$t('validFeedback')"
    rows="5"
    aria-describedby="input-live-feedback"
    @input="handleInputFeedback"
  />
</template>
