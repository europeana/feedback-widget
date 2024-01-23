<script setup>
import { computed, ref } from 'vue'
import FeedbackIcon from '@europeana/style/img/icons/feedback.svg'

const bigButton = ref(true)
const showWidget = ref(false)

const buttonClasses = computed(() => {
  return {
    'hide-button': showWidget.value,
    big: bigButton.value
  }
})
</script>

<template>
  <button
    ref="button"
    type="button"
    aria-label="Feedback"
    class="btn btn-primary btn-lg europeana-feedback-button text-decoration-none"
    :class="buttonClasses"
    @mouseover="bigButton = true"
    @mouseleave="bigButton = false"
  >
    <FeedbackIcon class="icon-ic-feedback d-inline-flex" />
    <span class="europeana-feedback-button-text">Feedback</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@europeana/style/scss/variables';

.europeana-feedback-button,
.europeana-feedback-container .europeana-feedback-button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1000;
  text-transform: capitalize;
  padding: 0.875rem;
  line-height: 1;
  white-space: nowrap;
  border-radius: 50%;
  max-width: 50px;
  transition:
    max-width 0.35s ease-out,
    border-radius 0.3s ease-out;
  box-shadow: 0 2px 8px rgb(26 26 26 / 25%);

  .icon-ic-feedback {
    padding-right: 0;
    font-size: 1.25rem;
    line-height: 1;
  }

  .europeana-feedback-button-text {
    transition: opacity 0.3s ease-out;
    opacity: 0;
  }

  &.hide-button {
    display: none;
  }

  &.big {
    border-radius: 0.3rem;
    max-width: 220px;
    transition:
      max-width 0.75s ease-out,
      border-radius 0.25s ease-out;

    .europeana-feedback-button-text {
      opacity: 1;
      transition: opacity 0.3s ease-out;
    }

    .icon-ic-feedback {
      padding-right: 0.25rem;
    }
  }

  @media (max-width: $bp-small) {
    &.big {
      max-width: 50px;
      border-radius: 50%;

      .europeana-feedback-button-text {
        opacity: 0;
      }

      .icon-ic-feedback {
        padding-right: 0;
      }
    }
  }
}
</style>
