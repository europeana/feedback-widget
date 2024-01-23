<script setup>
import { computed, ref } from 'vue'
import FeedbackIcon from '@europeana/style/img/icons/feedback.svg'

const bigButton = ref(true)
const showWidget = ref(false)

const buttonClasses = computed(() => {
  return {
    'hide-button': showWidget.value,
    big: bigButton.value
  }
})
</script>

<template>
  <button
    ref="button"
    type="button"
    aria-label="Feedback"
    class="btn btn-primary btn-lg europeana-feedback-button text-decoration-none"
    :class="buttonClasses"
    @mouseover="bigButton = true"
    @mouseleave="bigButton = false"
  >
    <FeedbackIcon class="icon-ic-feedback d-inline-flex" />
    <span class="europeana-feedback-button-text">Feedback</span>
  </button>
</template>
