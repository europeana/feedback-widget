<script setup>
  import { computed, ref } from 'vue'
  import FeedbackIcon from '@europeana/style/img/icons/feedback.svg'

  defineProps({
    lang: 'en'
  })

  const bigButton = ref(true)
  const showWidget = ref(false)

  const buttonClasses = computed(() => {
    return {
      'hide-button': showWidget.value,
      big: bigButton.value
    }
  })

  function showFeedbackForm() {
    // TODO: implement
    console.log('showFeedbackForm')
  }
</script>

<template>
  <div
    class="feedback-container"
  >
    <button
      ref="button"
      type="button"
      aria-label="Feedback"
      class="btn btn-primary btn-lg feedback-button text-decoration-none"
      :class="buttonClasses"
      @click="showFeedbackForm"
      @mouseover="bigButton = true"
      @mouseleave="bigButton = false"
    >
      <FeedbackIcon
        class="icon-ic-feedback d-inline-flex"
      />
      <span
        class="feedback-button-text"
      >Feedback</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/bootstrap';

  @import '@europeana/style/scss/variables';
  @import '@europeana/style/scss/buttons-links';
  @import '@europeana/style/scss/default';

  .feedback-container {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 1050;

    color: $textcolor;
    font-family: $font-family-sans-serif;
    font-size: 16px;
    line-height: 1.5;

    @media (min-width: $bp-small) {
      left: auto;
    }

    .feedback-button {
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
      transition: max-width 0.35s ease-out, border-radius 0.3s ease-out;
      box-shadow: 0 2px 8px rgb(26 26 26 / 25%);

      .icon-ic-feedback {
        padding-right: 0;
        font-size: 1.25rem;
        line-height: 1;
      }

      .feedback-button-text {
        transition: opacity 0.3s ease-out;
        opacity: 0;
      }

      &.hide-button {
        display: none;
      }

      &.big {
        border-radius: 0.3rem;
        max-width: 220px;
        transition: max-width 0.75s ease-out, border-radius 0.25s ease-out;

        .feedback-button-text {
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

          .feedback-button-text {
            opacity: 0;
          }

          .icon-ic-feedback {
            padding-right: 0;
          }
        }
      }
    }
  }

  .feedback-widget {
    border-radius: 0.3rem;
    background-color: $white;
    color: $mediumgrey;
    visibility: hidden;
    opacity: 0;
    transform: translate(0, 50px);
    transition: opacity 0.15s linear, transform 0.3s ease-out;
    position: fixed;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    margin: 0;
    overflow: hidden;

    @media (min-width: $bp-small) {
      left: auto;
      width: 540px;
    }

    &.show-feedback-widget {
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    .feedback-header {
      padding: 1.5rem 1rem 0;

      h2 {
        color: $greyblack;
        font-size: $font-size-large;
        line-height: 1.5;
        font-weight: 600;
        margin: 0;

        label {
          display: inline;
        }
      }
    }

    .feedback-form {
      padding: 1rem;

      .form-fields {
        flex: 0 1 100%;
        width: 0; // width will grow to space available in flexbox
        p, .invalid-feedback {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }

      }

      .form-buttons {
        flex: 0 1 100%;

        @media (max-width: $bp-small) {
          flex-wrap: wrap;

          .button-group-right {
            width: 100%;
          }

          button {
            width: 100%;
            margin: 0.5rem 0 0 !important;
          }
        }
      }

      .form-control {
        padding: 0.75rem;
        background: $white;
        border: 1px solid $middlegrey;
        border-radius: 0.375rem;
        font-size: $font-size-base;
        height: 3rem;
        color: $greyblack;

        &:focus {
          border-color: $innovationblue;
        }

        &.is-invalid {
          border-color: $red;
        }
      }

      textarea.form-control {
        height: auto;
      }

      .form-group {
        margin-bottom: 0;
      }

      .form-text {
        font-size: 0.875rem;
        margin: 0.75rem 0 0;

        a {
          color: $mediumgrey;
        }
      }
    }

    .feedback-success {
      color: $greyblack;
    }

    .icon-check-circle::before {
      font-size: 1.5rem;
    }

    .icon-cancel-circle::before {
      color: $red;
      font-size: 1.25rem;
    }
  }

  .faq-link {
    transition: $standard-transition;

    &:hover {
      color: $blue;
      transition: $standard-transition;
    }

    .icon-external-link {
      vertical-align: baseline;
    }
  }
</style>
