export const createI18n = (options = {}) => {
  return {
    locale: 'en',
    fallbackLocale: 'en',
    messages: {},
    ...options,
    t(key, locale = this.locale) {
      const textForLocale = key.split('.').reduce((memo, keyPart) => {
        memo = memo?.[keyPart]
        return memo
      }, this.messages[locale])

      if (textForLocale || locale === this.fallbackLocale) {
        return textForLocale
      } else {
        return this.t(key, this.fallbackLocale)
      }
    }
  }
}
