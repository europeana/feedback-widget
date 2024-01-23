<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import FeedbackButton from '@/components/FeedbackButton.vue'

const props = defineProps({
  locale: {
    type: String,
    default: () => 'en'
  }
})

const { t } = useI18n()

onMounted(() => {
  console.log(`lang prop: ${props.locale}`)
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
