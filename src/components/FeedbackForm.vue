<script setup>
import { computed, ref } from 'vue'

import FeedbackTextarea from './FeedbackTextarea.vue'

import CancelCircleIcon from '@europeana/style/img/icons/cancel_circle.svg'
import CheckCircleIcon from '@europeana/style/img/icons/check_circle.svg'
import ExternalLinkIcon from '@europeana/style/img/icons/external-link.svg'

const currentStep = ref(1)
const email = ref('')
const feedback = ref('')
const requestSuccess = ref(null)
const sending = ref(false)

const disableNextButton = computed(
  () => (currentStep.value === 1 && feedback.value === '') || sending.value
)
const disableSendButton = computed(
  () => (currentStep.value === 2 && email.value === '') || sending.value
)
const disableSkipButton = computed(() => sending.value)
const showCancelButton = computed(() => currentStep.value < 3 || !requestSuccess.value)
const showCloseButton = computed(() => !showCancelButton.value)
const showNextButton = computed(() => currentStep.value < 2)
const showSendButton = computed(
  () => currentStep.value === 2 || (currentStep.value === 3 && !requestSuccess.value)
)
const showSkipButton = computed(() => currentStep.value === 2)

const localePath = (path) => `/en${path}`

const goToStep = (step) => (currentStep.value = step)

const postFeedbackMessage = () => {
  console.log('postFeedbackMessage')
  // TODO: for early development testing purposes only; remove!
  if (feedback.value === 'no no no no no') {
    return Promise.reject()
  }
  return Promise.resolve()

  // TODO: re-implement using configurable endpoint url and native `fetch`
}

const sendFeedback = () => {
  sending.value = true

  return postFeedbackMessage()
    .then(() => {
      requestSuccess.value = true
      if (currentStep.value < 3) {
        goToStep(currentStep.value + 1)
      }
    })
    .catch(() => {
      requestSuccess.value = false
    })
    .finally(() => {
      sending.value = false
    })
}

const submitForm = async () => {
  if (currentStep.value > 1) {
    await sendFeedback()
  }
  if (currentStep.value < 3) {
    goToStep(currentStep.value + 1)
  }
}
</script>

<template>
  <form class="europeana-feedback-form" data-qa="feedback widget form" @submit.prevent="submitForm">
    <div class="d-flex flex-wrap">
      <div class="form-fields">
        <div v-if="currentStep === 1">
          <FeedbackTextarea v-model="feedback" />
          <div
            class="b-form-invalid-feedback"
            id="input-live-feedback"
            data-qa="feedback message invalid"
          >
            {{ $t('validFeedback') }}
          </div>
        </div>
        <div v-if="currentStep === 2" id="step2">
          <input
            v-model="email"
            autofocus
            type="email"
            name="email"
            :placeholder="$t('form.placeholders.email')"
            aria-describedby="input-live-feedback"
          />
          <div
            class="b-form-invalid-feedback"
            id="input-live-feedback"
            data-qa="feedback email invalid"
          >
            {{ $t('validEmail') }}
          </div>
          <div class="b-form-text" id="input-live-help">
            <p class="mb-0">
              {{ $t('emailOptional') }}
              <i18n-t keypath="policies" tag="span">
                <a :href="localePath('/rights')" target="_blank">
                  {{ $t('termsOfService') }}
                </a>
                <a :href="localePath('/rights/privacy-policy')" target="_blank">
                  {{ $t('privacyPolicy') }}
                </a>
              </i18n-t>
            </p>
          </div>
        </div>
        <div v-if="currentStep == 3" id="step3" class="feedback-success d-flex align-items-center">
          <span v-if="requestSuccess">
            <CheckCircleIcon class="icon-check-circle mr-3" />
            <p class="mb-0">{{ $t('success') }}</p>
            <p class="mb-0">{{ $t('thankYou') }}</p>
          </span>
          <span v-else-if="requestSuccess === false">
            <CancelCircleIcon class="icon-cancel-circle mr-3" />
            <span class="mb-0">{{ $t('failed') }}</span>
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
          class="btn btn-outline-primary mt-3"
          @click.prevent="$emit('hide')"
        >
          {{ $t('cancel') }}
        </button>
        <div class="button-group-right">
          <button
            v-if="showSkipButton"
            data-qa="feedback skip button"
            class="btn btn-outline-primary mt-3 ml-2"
            :disabled="disableSkipButton"
            @click="skipEmail"
          >
            {{ $t('skipSend') }}</button
          ><!-- This comment removes white space
          --><button
            v-if="showNextButton"
            data-qa="feedback next button"
            variant="primary"
            class="btn btn-primary button-next-step mt-3 ml-2"
            type="submit"
            :disabled="disableNextButton"
          >
            {{ $t('next') }}
          </button>
          <button
            v-if="showSendButton"
            data-qa="feedback send button"
            class="btn btn-primary mt-3 ml-2"
            type="submit"
            :disabled="disableSendButton"
          >
            {{ $t('send') }}
          </button>
          <button
            v-if="showCloseButton"
            data-qa="feedback close button"
            class="btn btn-primary mt-3 ml-2"
            @click.prevent="$emit('hide')"
          >
            {{ $t('close') }}
          </button>
        </div>
      </div>
      <a
        :href="localePath('/faq')"
        target="_blank"
        class="faq-link mt-4 mb-2 p-0 w-100 text-decoration-none"
      >
        {{ $t('faq') }}
        <ExternalLinkIcon class="icon-external-link" />
      </a>
    </div>
  </form>
</template>
