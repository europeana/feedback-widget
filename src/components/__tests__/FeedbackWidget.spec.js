import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackWidget from '../FeedbackWidget.vue'

describe('FeedbackWidget', () => {
  it('is labelled "Feedback"', () => {
    const wrapper = mount(FeedbackWidget)

    expect(wrapper.text()).toContain('Feedback')
  })

  it('shows the feedback icon in a button', () => {
    const wrapper = mount(FeedbackWidget)

    const icon = wrapper.find('button svg.icon-ic-feedback')

    expect(icon.isVisible()).toBe(true)
  })
})
