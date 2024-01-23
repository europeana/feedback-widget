<script setup>
import { onMounted, ref } from 'vue'

import FeedbackButton from '@/components/FeedbackButton.vue'
import FeedbackDialog from '@/components/FeedbackDialog.vue'

const props = defineProps({
  lang: {
    type: String,
    default: () => 'en'
  }
})

const showDialog = ref(false)

onMounted(() => {
  console.log(`lang prop: ${props.lang}`)
})

// TODO: re-implement
function handleClickFeedbackButton() {
  // this.resetForm()
  showDialog.value = true
  // this.$nextTick(() => {
  //   const textarea = this.$refs.input
  //   textarea.focus()
  // })
}
</script>

<template>
  <div class="europeana-feedback-container">
    <FeedbackButton
      v-show="!showDialog"
      @click="handleClickFeedbackButton"
    />
    <FeedbackDialog
      v-show="showDialog"
    />
  </div>
</template>

<style lang="scss">
@import '@/assets/style';
</style>
