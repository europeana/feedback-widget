import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackTextarea from '../FeedbackTextarea.vue'

describe('FeedbackTextarea', () => {
  it('validates feedback required', () => {
    const wrapper = mount(FeedbackTextarea)

    const textarea = wrapper.find('textarea')

    textarea.setValue('')
    expect(textarea.element.validity.valueMissing).toBe(true)

    textarea.setValue('1')
    expect(textarea.element.validity.valueMissing).toBe(false)
  })

  it('validates feedback length on input', () => {
    const wrapper = mount(FeedbackTextarea)

    const textarea = wrapper.find('textarea')

    textarea.setValue('1 2 3 4')
    expect(textarea.element.validity.customError).toBe(true)

    textarea.setValue('1 2 3 4 5')
    expect(textarea.element.validity.customError).toBe(false)
  })
})
