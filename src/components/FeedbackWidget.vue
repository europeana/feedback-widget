<script setup>
import { computed, defineProps, provide, ref, watch } from 'vue'

import { createI18n } from '@/utils/i18n.js'
import * as messages from '@/locales/index.js'
import { configProps } from '@/config.js'

import FeedbackButton from '@/components/FeedbackButton.vue'
import FeedbackDialog from '@/components/FeedbackDialog.vue'

const props = defineProps(configProps)

const i18n = computed(() => {
  return createI18n({
    locale: props.locale,
    fallbackLocale: props.fallbackLocale,
    messages
  })
})

provide(
  'config',
  computed(() => props)
)
provide(
  'i18n',
  computed(() => i18n.value)
)

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
