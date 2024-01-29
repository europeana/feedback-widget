export const defaults = {
  apiUrl: 'https://www.europeana.eu/_api/jira-service-desk/feedback',
  locale: 'en'
}

export const createConfig = (mountSelector) =>
  Object.keys(defaults).reduce((memo, cKey) => {
    const mountElement = document.querySelector(mountSelector)

    if (Object.hasOwn(mountElement.dataset, cKey)) {
      memo[cKey] = mountElement.dataset[cKey]
    } else {
      memo[cKey] = defaults[cKey]
    }
    return memo
  }, {})
