import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackButton from '../FeedbackButton.vue'

const factory = () =>
  mount(FeedbackButton, {
    global: {
      mocks: {
        $t: (key) => key
      }
    }
  })

describe('FeedbackButton', () => {
  it('is labelled "Feedback"', () => {
    const wrapper = factory()

    expect(wrapper.text()).toContain('actions.feedback')
  })

  it('shows the feedback icon in a button', () => {
    const wrapper = factory()

    const icon = wrapper.find('button svg.icon-ic-feedback')

    expect(icon.isVisible()).toBe(true)
  })
})
