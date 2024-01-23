<script setup>
import FeedbackButton from './FeedbackButton.vue'

defineProps({
  lang: {
    type: String,
    default: () => 'en'
  }
})

function showFeedbackForm() {
  // TODO: implement
  console.log('showFeedbackForm')
}
</script>

<template>
  <div class="europeana-feedback-container">
    <FeedbackButton @click="showFeedbackForm" />
  </div>
</template>

<style lang="scss">
@import '@/assets/style';
</style>
