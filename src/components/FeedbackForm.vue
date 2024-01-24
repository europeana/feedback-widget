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

const localePath = (path) => `/en${path}`

const wordLength = (text) => text?.trim()?.match(/\w+/g)?.length || 0

const validateFeedbackLength = () => wordLength(feedback) >= 5;

const goToStep = (step) => currentStep.value = step

const postFeedbackMessage = () => {
  return Promise.resolve()

  // TODO: re-implement using configurable endpoint url and native `fetch`

  // const postData = {
  //   feedback: this.feedback,
  //   pageUrl: window.location.href,
  //   browser: navigator.userAgent,
  //   screensize: `${window.innerWidth} x ${window.innerHeight}`
  // };
  // if (this.email && (this.email !== '')) {
  //   postData.email = this.email;
  // }
  //
  // // For testing purposes, uncomment the following `if` block to cause the
  // // request always to fail on the first attempt, showing the error message,
  // // but then succeeding on subsequent attempts.
  // // if (this.requestSuccess === null) {
  // //   delete postData.summary;
  // // }
  //
  // return axios.create({
  //   baseURL: this.$config.app.baseUrl
  // }).post(
  //   '/_api/jira-service-desk/feedback',
  //   postData
  // );
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

const submitForm = async() => {
  // If this handler gets called, then the fields are valid
  feedbackInputState.value = true
  emailInputState.value = true

  if (currentStep.value === 1 && !validateFeedbackLength()) {
    feedbackInputState.value = false
    return
  }

  if (currentStep.value > 1) {
    await sendFeedback()
  }
  if (currentStep.value < 3) {
    goToStep(currentStep.value + 1)
  }
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
            class="form-control"
            ref="input"
            v-model="feedback"
            name="feedback"
            required="required"
            :placeholder="$t('validFeedback')"
            :state="feedbackInputState"
            rows="5"
            data-qa="feedback textarea"
            aria-describedby="input-live-feedback"
            @invalid="flagInvalidFeedback"
          />
          <div class="b-form-invalid-feedback" id="input-live-feedback" data-qa="feedback message invalid">
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
            :state="emailInputState"
            aria-describedby="input-live-feedback"
            data-qa="feedback email input"
            @invalid="flagInvalidEmail"
          />
          <div class="b-form-invalid-feedback" id="input-live-feedback" data-qa="feedback email invalid">
            {{ $t('validEmail') }}
          </div>
          <div class="b-form-text" id="input-live-help">
            <p class="mb-0">
              {{ $t('emailOptional') }}
              <!-- <i18n path="feedback.policies" tag="span">
                <a :href="localePath('/rights')" target="_blank">
                  {{ $t('termsOfService') }}
                </a>
                <a :href="localePath('/rights/privacy-policy')" target="_blank">
                  {{ $t('privacyPolicy') }}
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
            <p class="mb-0">{{ $t('success') }}</p>
            <p class="mb-0">{{ $t('thankYou') }}</p>
          </span>
          <span v-else-if="requestSuccess === false">
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
          @click.prevent="hideFeedbackForm"
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
            {{ $t('skipSend') }} </button
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
            @click.prevent="hideFeedbackForm"
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
        <span class="icon-external-link" />
      </a>
    </div>
  </form>
</template>
