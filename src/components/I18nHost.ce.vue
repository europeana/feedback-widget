<script setup>
import { defineComponent, provide, watchEffect } from 'vue'
import { createI18n, I18nInjectionKey } from 'vue-i18n'

const props = defineProps({
  locale: 'en'
})

const locales = ['en', 'nl'];
const loadMessages = () => {
  const messages = {};

  locales.forEach(async (locale) => messages[locale] = (await import(`../locales/${locale}.js`)).default);
  return messages;
}

const i18n = createI18n({
  legacy: false,
  locale: props.locale,
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  globalInjection: true,
  messages: loadMessages()
})


provide(I18nInjectionKey, i18n)

watchEffect(() => {
  i18n.global.locale.value = props.locale
})
</script>

<template>
  <slot />
</template>
