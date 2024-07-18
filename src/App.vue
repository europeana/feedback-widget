<script setup>
import { ref, watch } from 'vue'

import FeedbackButton from '@/components/FeedbackButton.vue'
import FeedbackDialog from '@/components/FeedbackDialog.vue'

const showDialog = ref(false)
const buttonFocus = ref(false)

watch(showDialog, (newVal) => {
  if (newVal === false) {
    buttonFocus.value = true
  }
})
</script>

<template>
  <div class="europeana-feedback-container">
    <FeedbackDialog v-if="showDialog" @hide="showDialog = false" />
    <FeedbackButton v-else @click="showDialog = true" :button-focus="buttonFocus" />
  </div>
</template>

<style lang="scss">
@import '@/assets/style';
@import '@europeana/style/scss/variables';
body {
  background-color: $grey;
}
</style>
