<script setup>
import { computed, inject, ref, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelCircleIcon from '@europeana/style/img/icons/cancel_circle.svg'
import CheckCircleIcon from '@europeana/style/img/icons/check_circle.svg'
import ExternalLinkIcon from '@europeana/style/img/icons/external-link.svg'

const config = inject('config')
const { locale, t } = useI18n()

const currentStep = ref(1)
const feedbackForm = ref(null)
const email = ref('')
const emailInput = ref(null)
const feedback = ref('')
const feedbackTextarea = ref(null)
const requestSuccess = ref(null)
const sending = ref(false)
const invalid = ref({})

onMounted(() => {
  feedbackTextarea.value.focus()
})

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

const docsUrl = (path) => `https://www.europeana.eu/${locale.value}${path}`

const wordLength = (text) => text?.trim()?.match(/\w+/g)?.length || 0

const goToStep = (step) => (currentStep.value = step)

const handleInputFeedback = () => {
  if (wordLength(feedback.value) < 5) {
    feedbackTextarea.value.setCustomValidity(t('validFeedback'))
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
  invalid.value = {}
  const valid = feedbackForm.value.checkValidity()

  if (!valid) {
    Array.from(feedbackForm.value.elements)
      .find((el) => !el.valid)
      ?.focus()
    return
  }

  if (currentStep.value > 1) {
    await sendFeedback()
  }
  if (currentStep.value < 3) {
    goToStep(currentStep.value + 1)

    if (currentStep.value === 2) {
      nextTick(() => {
        emailInput.value.focus()
      })
    }
  }
}

const handleInvalidField = (field) => {
  invalid.value[field] = true
}

const skipEmail = () => {
  email.value = ''
}
</script>

<template>
  <form
    class="europeana-feedback-form"
    data-qa="feedback widget form"
    novalidate
    ref="feedbackForm"
    @submit.prevent="submitForm"
  >
    <div class="d-flex flex-wrap">
      <div class="form-fields">
        <div v-if="currentStep === 1">
          <label for="efw-feedback-input" class="d-block"
            >{{ $t('feedback') }}
            <span v-if="invalid.feedback" class="visually-hidden">
              {{ feedbackTextarea.validationMessage }}
            </span>
          </label>
          <textarea
            v-model="feedback"
            id="efw-feedback-input"
            class="form-control"
            :class="{ 'is-invalid': invalid.feedback }"
            ref="feedbackTextarea"
            required
            name="feedback"
            rows="5"
            aria-required="true"
            :aria-invalid="invalid.feedback"
            @invalid="handleInvalidField('feedback')"
            @input="handleInputFeedback"
          />
          <div v-if="invalid.feedback" id="efw-feedback-textarea-error" class="invalid-feedback">
            {{ feedbackTextarea.validationMessage }}
          </div>
        </div>
        <div v-if="currentStep === 2">
          <label for="efw-email-input" class="d-block">
            {{ $t('emailAddress') }}
            <span v-if="invalid.email" class="visually-hidden">
              {{ emailInput.validationMessage }}
            </span>
          </label>
          <input
            id="efw-email-input"
            v-model="email"
            class="form-control"
            :class="{ 'is-invalid': invalid.email }"
            ref="emailInput"
            autocomplete="email"
            type="email"
            name="email"
            aria-describedby="efw-input-live-feedback"
            @invalid="handleInvalidField('email')"
            :aria-invalid="invalid.email"
          />
          <div v-if="invalid.email" id="efw-email-input-error" class="invalid-feedback">
            {{ emailInput.validationMessage }}
          </div>
          <div class="form-text" id="efw-input-live-feedback">
            <p class="mb-0">
              {{ $t('emailOptional') }}
              <i18n-t keypath="policies" tag="span">
                <a :href="docsUrl('/rights')" target="_blank">
                  {{ $t('termsOfService') }}
                </a>
                <a :href="docsUrl('/rights/privacy-policy')" target="_blank">
                  {{ $t('privacyPolicy') }}
                </a>
              </i18n-t>
            </p>
          </div>
        </div>
        <div
          v-if="currentStep == 3"
          class="feedback-success d-flex align-items-center mb-3 mb-sm-0"
          role="alert"
          aria-atomic="true"
        >
          <span v-if="requestSuccess" class="d-flex align-items-center">
            <CheckCircleIcon class="icon-check-circle" />
            <span class="ms-3">
              <p class="mb-0">{{ $t('success') }}</p>
              <p class="mb-0">{{ $t('thankYou') }}</p>
            </span>
          </span>
          <span v-else-if="requestSuccess === false" class="d-flex align-items-center">
            <CancelCircleIcon
              class="icon-cancel-circle"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            />
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
            {{ $t('skipSend') }}
          </button>
          <button
            v-if="showNextButton"
            data-qa="feedback next button"
            class="btn btn-primary button-next-step mt-3"
            type="submit"
            :disabled="disableNextButton"
          >
            {{ $t('next') }}
          </button>
          <button
            v-if="showSendButton"
            data-qa="feedback send button"
            class="btn btn-primary mt-3"
            type="submit"
            :disabled="disableSendButton"
          >
            {{ $t('send') }}
          </button>
          <button
            v-if="showCloseButton"
            data-qa="feedback close button"
            class="btn btn-primary mt-3"
            @click.prevent="$emit('hide')"
          >
            {{ $t('close') }}
          </button>
        </div>
      </div>
      <a
        v-if="config.faqUrl"
        :href="config.faqUrl"
        target="_blank"
        class="faq-link d-inline-flex align-items-center mt-4 mb-2 p-0 w-100 text-decoration-none"
      >
        <span>{{ $t('faq') }}</span>
        <ExternalLinkIcon
          class="icon-external-link ms-1"
          width="16px"
          height="16px"
          viewBox="0 0 32 32"
        />
      </a>
    </div>
  </form>
</template>
