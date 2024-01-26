<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import FeedbackIcon from '@europeana/style/img/icons/feedback.svg'

defineProps({
  hide: {
    type: String,
    default: () => 'en'
  }
})

const bigButton = ref(true)

onMounted(() => {
  window.addEventListener('scroll', shrinkButton, { once: true });
})

onUnmounted(() => {
  window.removeEventListener('scroll', shrinkButton, { once: true });
})

const shrinkButton = () => bigButton.value = false;

const buttonClasses = computed(() => {
  return {
    big: bigButton.value
  }
})
</script>

<template>
  <button
    ref="button"
    type="button"
    :aria-label="$t('feedback')"
    class="btn btn-primary btn-lg europeana-feedback-button text-decoration-none"
    :class="buttonClasses"
    @mouseover="bigButton = true"
    @mouseleave="bigButton = false"
  >
    <FeedbackIcon class="icon-ic-feedback d-inline-flex" width="20px" height="20px" viewBox="0 0 32 32"/>
    <span class="europeana-feedback-button-text">{{ $t('feedback') }}</span>
  </button>
</template>
