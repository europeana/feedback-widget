<script setup>
import FeedbackForm from '@/components/FeedbackForm.vue'
</script>

<template>
  <div
    role="dialog"
    aria-labelledby="dialogHeader"
    class="europeana-feedback-dialog shadow"
    content-class="shadow"
  >
    <div
      id="dialogHeader"
      class="feedback-header"
    >
      <h2><label for="feedback-widget-feedback-input">{{ $t('feedback.title') }}</label></h2>
    </div>
    <FeedbackForm />
  </div>
</template>
