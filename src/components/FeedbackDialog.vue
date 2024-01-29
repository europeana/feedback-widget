<script setup>
import FeedbackForm from '@/components/FeedbackForm.vue'
</script>

<template>
  <div
    role="dialog"
    aria-labelledby="efw-dialog-header"
    class="europeana-feedback-dialog shadow"
    content-class="shadow"
  >
    <div id="efw-dialog-header" class="feedback-header">
      <h2>
        <label for="feedback-widget-feedback-input">{{ $t('title') }}</label>
      </h2>
    </div>
    <FeedbackForm @hide="$emit('hide')" />
  </div>
</template>
