<script setup>
import { computed, inject, ref } from 'vue'

import CancelCircleIcon from '@europeana/style/img/icons/cancel_circle.svg'
import CheckCircleIcon from '@europeana/style/img/icons/check_circle.svg'
import ExternalLinkIcon from '@europeana/style/img/icons/external-link.svg'

const config = inject('config')

const currentStep = ref(1)
const email = ref('')
const emailInput = ref(null)
const feedback = ref('')
const feedbackTextarea = ref(null)
const requestSuccess = ref(null)
const sending = ref(false)
const feedbackTextareaValidityState = ref(true)
const emailInputValidityState = ref(true)

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

const wordLength = (text) => text?.trim()?.match(/\w+/g)?.length || 0

const goToStep = (step) => (currentStep.value = step)

const handleInputFeedback = () => {
  if (wordLength(feedback.value) < 5) {
    // TODO: i18n
    feedbackTextarea.value.setCustomValidity('Your feedback has to consist of 5 words at minimum')
  } else {
    feedbackTextarea.value.setCustomValidity('')
  }
}

const postFeedbackMessage = () => {
  const postData = {
    feedback: feedback.value,
    pageUrl: window.location.href,
    browser: navigator.userAgent,
    screensize: `${window.innerWidth} x ${window.innerHeight}`
  }
  if (email.value && email.value !== '') {
    postData.email = email.value
  }

  return fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
}

const sendFeedback = async () => {
  sending.value = true

  try {
    const response = await postFeedbackMessage()
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    requestSuccess.value = true
    if (currentStep.value < 3) {
      goToStep(currentStep.value + 1)
    }
  } catch {
    requestSuccess.value = false
  } finally {
    sending.value = false
  }
}

const submitForm = async () => {
  if (currentStep.value > 1) {
    await sendFeedback()
  }
  if (currentStep.value < 3) {
    goToStep(currentStep.value + 1)
  }
}

const validateTextArea = () => {
  feedbackTextareaValidityState.value = feedbackTextarea.value?.validity.valid
}

const validateEmailInput = () => {
  emailInputValidityState.value = emailInput.value?.validity.valid
}
</script>

<template>
  <form class="europeana-feedback-form" data-qa="feedback widget form" @submit.prevent="submitForm">
    <div class="d-flex flex-wrap">
      <div class="form-fields">
        <div v-if="currentStep === 1">
          <textarea
            v-model="feedback"
            id="feedback-widget-feedback-input"
            class="form-control"
            :class="{ 'is-invalid': !feedbackTextareaValidityState }"
            ref="feedbackTextarea"
            autofocus
            required
            name="feedback"
            :placeholder="$t('validFeedback')"
            rows="5"
            aria-describedby="input-live-feedback"
            aria-required="true"
            :aria-invalid="feedbackTextareaValidityState ? null : true"
            @input="handleInputFeedback"
          />
          <div
            v-if="!feedbackTextareaValidityState"
            class="d-inline-block invalid-feedback"
            id="input-live-feedback"
            data-qa="feedback message invalid"
          >
            {{ $t('validFeedback') }}
          </div>
        </div>
        <div v-if="currentStep === 2" id="step2">
          <input
            v-model="email"
            class="form-control"
            :class="{ 'is-invalid': !emailInputValidityState }"
            ref="emailInput"
            autofocus
            type="email"
            name="email"
            :placeholder="$t('form.placeholders.email')"
            aria-describedby="input-live-feedback"
            :aria-invalid="emailInputValidityState ? null : true"
          />
          <div
            v-if="!emailInputValidityState"
            class="d-inline-block invalid-feedback"
            id="input-live-feedback"
            data-qa="feedback email invalid"
          >
            {{ $t('validEmail') }}
          </div>
          <div class="form-text" id="input-live-help">
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
        <div v-if="currentStep == 3" id="step3" class="feedback-success d-flex align-items-center mb-3 mb-sm-0">
          <span 
            v-if="requestSuccess"
            class="d-flex align-items-center"
          >
            <CheckCircleIcon class="icon-check-circle" />
            <span class="ms-3">
              <p class="mb-0">{{ $t('success') }}</p>
              <p class="mb-0">{{ $t('thankYou') }}</p>
            </span>
          </span>
          <span 
            v-else-if="requestSuccess === false"           
            class="d-flex align-items-center"
          >
            <CancelCircleIcon class="icon-cancel-circle" width="20px" height="20px" viewBox="0 0 24 24" />
            <span class="mb-0 ms-3">{{ $t('failed') }}</span>
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
            class="btn btn-outline-primary mt-3 ms-2"
            :disabled="disableSkipButton"
            @click="skipEmail"
          >
            {{ $t('skipSend') }}</button
          ><!-- This comment removes white space
          --><button
            v-if="showNextButton"
            data-qa="feedback next button"
            variant="primary"
            class="btn btn-primary button-next-step mt-3 ms-2"
            type="submit"
            :disabled="disableNextButton"
            @click="validateTextArea"
          >
            {{ $t('next') }}
          </button>
          <button
            v-if="showSendButton"
            data-qa="feedback send button"
            class="btn btn-primary mt-3 ms-2"
            type="submit"
            :disabled="disableSendButton"
            @click="validateEmailInput"
          >
            {{ $t('send') }}
          </button>
          <button
            v-if="showCloseButton"
            data-qa="feedback close button"
            class="btn btn-primary mt-3 ms-2"
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
        <ExternalLinkIcon class="icon-external-link" width="16px" height="16px" viewBox="0 0 32 32" />
      </a>
    </div>
  </form>
</template>
