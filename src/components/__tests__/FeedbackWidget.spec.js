import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackWidget from '../FeedbackWidget.ce.vue'

describe('FeedbackWidget', () => {
  it('renders properly', () => {
    const wrapper = mount(FeedbackWidget)
    expect(wrapper.text()).toContain('Feedback Widget')
  })
})
