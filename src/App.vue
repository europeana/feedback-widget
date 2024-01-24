<script setup>
import { ref } from 'vue'

import FeedbackButton from '@/components/FeedbackButton.vue'
import FeedbackDialog from '@/components/FeedbackDialog.vue'

const showDialog = ref(false)
</script>

<template>
  <div class="europeana-feedback-container">
    <FeedbackDialog v-if="showDialog" @hide="showDialog = false" />
    <FeedbackButton v-else @click="showDialog = true" />
  </div>
</template>

<style lang="scss">
@import '@/assets/style';
</style>
