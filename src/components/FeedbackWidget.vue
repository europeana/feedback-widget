<script setup>
import { defineProps, provide, ref, watch } from 'vue'

import { createConfig, defaults, mountSelector as defaultMountSelector } from '@/config.js'
import { createI18n } from 'vue-i18n'
import * as messages from '@/locales/index.js'

import FeedbackButton from '@/components/FeedbackButton.vue'
import FeedbackDialog from '@/components/FeedbackDialog.vue'

const props = defineProps({
  mountSelector: {
    type: String,
    default: defaultMountSelector
  }
})

const config = createConfig(props.mountSelector)

const i18n = createI18n({
  legacy: false,
  locale: config.locale,
  fallbackLocale: defaults.locale,
  silentFallbackWarn: true,
  globalInjection: false,
  messages
}).global

provide('config', config)
provide('i18n', i18n)

const showDialog = ref(false)
const buttonFocus = ref(false)

watch(showDialog, (newVal) => {
  if (newVal === false) {
    buttonFocus.value = true
  }
})
</script>

<template>
  <div class="europeana-feedback-container">
    <FeedbackDialog v-if="showDialog" @hide="showDialog = false" />
    <FeedbackButton v-else @click="showDialog = true" :button-focus="buttonFocus" />
  </div>
</template>

<style lang="scss">
@import '@/assets/style';
</style>
