<script setup>
import { computed, ref, onMounted } from 'vue'
import FeedbackIcon from '@europeana/style/img/icons/feedback.svg'

const props = defineProps({
  // TODO: clean up hide prop as it's unused?
  hide: {
    type: String,
    default: () => 'en'
  },
  buttonFocus: {
    type: Boolean,
    default: false
  }
})

const button = ref("button")
const bigButton = ref(true)

const buttonClasses = computed(() => {
  return {
    big: bigButton.value
  }
})

onMounted(() => {
  if (props.buttonFocus === true) {
    button.value.focus()
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
    <FeedbackIcon class="icon-ic-feedback d-inline-flex" />
    <span class="europeana-feedback-button-text">{{ $t('feedback') }}</span>
  </button>
</template>
