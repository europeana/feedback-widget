<script setup>
import { computed, ref } from 'vue'

const currentStep = ref(1)
const feedback = ref('')
const feedbackInputState = ref(true)
const email = ref('')
const emailInputState = ref(true)
const requestSuccess = ref(null)
const sending = ref(false)

const showCancelButton = computed(() => (currentStep.value < 3) || !requestSuccess.value)
const showNextButton = computed(() => currentStep.value < 2)
const disableNextButton = computed(() => ((currentStep.value === 1) && (feedback.value === '')) || sending.value)
const disableSendButton = computed(() => ((currentStep.value === 2) && (email.value === '')) || sending.value)
const disableSkipButton = computed(() => sending.value)
const showSkipButton = computed(() => currentStep.value === 2)
const showSendButton = computed(() => currentStep.value === 2 || ((currentStep.value === 3) && !requestSuccess.value))
const showCloseButton = computed(() => !showCancelButton.value)

function localePath(path) {
  return `/en${path}`
}
</script>

<template>
  <form
    class="europeana-feedback-form"
    data-qa="feedback widget form"
    @submit.prevent="submitForm"
  >
    <div class="d-flex flex-wrap">
      <div class="form-fields">
        <div v-if="currentStep === 1">
          <textarea
            id="feedback-widget-feedback-input"
            ref="input"
            v-model="feedback"
            name="feedback"
            required="required"
            :placeholder="$t('feedback.validFeedback')"
            :state="feedbackInputState"
            rows="5"
            data-qa="feedback textarea"
            aria-describedby="input-live-feedback"
            @invalid="flagInvalidFeedback"
          />
          <div class="b-form-invalid-feedback" id="input-live-feedback" data-qa="feedback message invalid">
            {{ $t('feedback.validFeedback') }}
          </div>
        </div>
        <div v-if="currentStep === 2" id="step2">
          <input
            v-model="email"
            autofocus
            type="email"
            name="email"
            :placeholder="$t('feedback.form.placeholders.email')"
            :state="emailInputState"
            aria-describedby="input-live-feedback"
            data-qa="feedback email input"
            @invalid="flagInvalidEmail"
          />
          <div class="b-form-invalid-feedback" id="input-live-feedback" data-qa="feedback email invalid">
            {{ $t('feedback.validEmail') }}
          </div>
          <div class="b-form-text" id="input-live-help">
            <p class="mb-0">
              {{ $t('feedback.emailOptional') }}
              <!-- <i18n path="feedback.policies" tag="span">
                <a :href="localePath('/rights')" target="_blank">
                  {{ $t('feedback.termsOfService') }}
                </a>
                <a :href="localePath('/rights/privacy-policy')" target="_blank">
                  {{ $t('feedback.privacyPolicy') }}
                </a>
              </i18n> -->
            </p>
          </div>
        </div>
        <div
          v-if="currentStep == 3"
          id="step3"
          class="feedback-success d-flex align-items-center"
        >
          <span :class="requestSuccess ? 'icon-check-circle mr-3' : 'icon-cancel-circle mr-3'" />
          <span v-if="requestSuccess">
            <p class="mb-0">{{ $t('feedback.success') }}</p>
            <p class="mb-0">{{ $t('feedback.thankYou') }}</p>
          </span>
          <span v-else-if="requestSuccess === false">
            <span class="mb-0">{{ $t('feedback.failed') }}</span>
          </span>
        </div>
      </div>
      <div
        class="form-buttons d-flex align-items-end"
        :class="showCloseButton ? 'justify-content-end' : 'justify-content-between'"
      >
        <button
          v-if="showCancelButton"
          data-qa="feedback cancel button"
          variant="outline-primary"
          class="mt-3"
          @click.prevent="hideFeedbackForm"
        >
          {{ $t('actions.cancel') }}
        </button>
        <div class="button-group-right">
          <button
            v-if="showSkipButton"
            data-qa="feedback skip button"
            variant="outline-primary"
            class="mt-3 ml-2"
            :disabled="disableSkipButton"
            @click="skipEmail"
          >
            {{ $t('actions.skipSend') }} </button
          ><!-- This comment removes white space
          --><button
            v-if="showNextButton"
            data-qa="feedback next button"
            variant="primary"
            class="button-next-step mt-3 ml-2"
            type="submit"
            :disabled="disableNextButton"
          >
            {{ $t('actions.next') }}
          </button>
          <button
            v-if="showSendButton"
            data-qa="feedback send button"
            variant="primary"
            class="mt-3 ml-2"
            type="submit"
            :disabled="disableSendButton"
          >
            {{ $t('actions.send') }}
          </button>
          <button
            v-if="showCloseButton"
            data-qa="feedback close button"
            variant="primary"
            class="mt-3 ml-2"
            @click.prevent="hideFeedbackForm"
          >
            {{ $t('actions.close') }}
          </button>
        </div>
      </div>
      <a
        :href="localePath('/faq')"
        target="_blank"
        class="faq-link mt-4 mb-2 p-0 w-100 text-decoration-none"
      >
        {{ $t('feedback.faq') }}
        <span class="icon-external-link" />
      </a>
    </div>
  </form>
</template>
