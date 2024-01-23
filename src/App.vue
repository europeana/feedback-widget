<script setup>
import { onMounted } from 'vue'
import FeedbackButton from '@/components/FeedbackButton.vue'

const props = defineProps({
  lang: {
    type: String,
    default: () => 'en'
  }
})

onMounted(() => {
  console.log(`lang prop: ${props.lang}`)
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
