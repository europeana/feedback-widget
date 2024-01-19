<script setup>
import { defineComponent, provide, watchEffect } from 'vue'
import { createI18n, I18nInjectionKey } from 'vue-i18n'

const locales = ['en'];
const loadMessages = () => {
  const messages = {};

  locales.forEach(locale => messages[locale] = import(`../locales/${locale}.js`));
  return messages;
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  globalInjection: true,
  messages: { en: { success: "TRANSLATION SUCCESS!" } }
})

const props = defineProps({
  locale: 'en'
})

provide(I18nInjectionKey, i18n)

watchEffect(() => {
  i18n.global.locale.value = props.locale
})
</script>

<template>
  <slot />
</template>
