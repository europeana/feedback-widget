import { createI18n } from 'vue-i18n'

const locales = ['en'];

const loadMessages = () => {
  const messages = {};

  locales.forEach(locale => messages[locale] = import(`./locales/${locale}.js`));
  return messages;
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  globalInjection: true,
  messages: loadMessages()
})
