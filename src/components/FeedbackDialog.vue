<script setup>
import FeedbackForm from '@/components/FeedbackForm.vue'
</script>

<template>
  <div
    role="dialog"
    class="europeana-feedback-dialog shadow"
    content-class="shadow"
    @keydown.esc="$emit('hide')"
  >
    <div class="feedback-header">
      <h2>
        {{ $t('title') }}
      </h2>
    </div>
    <FeedbackForm @hide="$emit('hide')" />
  </div>
</template>
