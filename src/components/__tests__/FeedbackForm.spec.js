import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackForm from '../FeedbackForm.vue'

describe('FeedbackForm', () => {
  it('mounts', () => {
    const wrapper = mount(FeedbackForm)
  })
})
