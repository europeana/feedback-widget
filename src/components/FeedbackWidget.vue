<script setup>
import FeedbackButton from './FeedbackButton.vue'

defineProps({
  lang: {
    type: String,
    default: () => 'en'
  }
})

function showFeedbackForm() {
  // TODO: implement
  console.log('showFeedbackForm')
}
</script>

<template>
  <div class="europeana-feedback-container">
    <FeedbackButton @click="showFeedbackForm" />
  </div>
</template>

<style lang="scss">
@import '@europeana/style/scss/variables';

.europeana-feedback-container {
  @import '@/assets/bootstrap';

  @import '@europeana/style/scss/buttons-links';
  @import '@europeana/style/scss/default';

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
}

.europeana-feedback-widget {
  border-radius: 0.3rem;
  background-color: $white;
  color: $mediumgrey;
  visibility: hidden;
  opacity: 0;
  transform: translate(0, 50px);
  transition:
    opacity 0.15s linear,
    transform 0.3s ease-out;
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

  &.show-europeana-feedback-widget {
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

  .europeana-feedback-form {
    padding: 1rem;

    .form-fields {
      flex: 0 1 100%;
      width: 0; // width will grow to space available in flexbox
      p,
      .invalid-feedback {
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
