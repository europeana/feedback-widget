import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackForm from '../FeedbackForm.vue'
import { useI18n } from "vue-i18n"

vi.mock('vue-i18n')

useI18n.mockReturnValue({
  locale: 'en',
  t: (key) => key,
})

const factory = (options = {}) => {
  const wrapper = mount(FeedbackForm, options)
  return wrapper
}

describe('FeedbackForm', () => {
  describe('next button', () => {
    describe('when there is no value for feedback', () => {
      it('is disabled', async() => {
        const wrapper = factory()

        await wrapper.find('[data-qa="feedback-textarea"]').setValue('')

        expect(wrapper.find('[data-qa="feedback next button"]').attributes('disabled')).toBe('')
      })
    })
    describe('when there is a value for feedback', () => {
      it('is enabled', async() => {
        const wrapper = factory()

        await wrapper.find('[data-qa="feedback-textarea"]').setValue('This website is great!')

        expect(wrapper.find('[data-qa="feedback next button"]').attributes('disabled')).toBe(undefined)
      })
      describe('and it is clicked and it has only 4 words', () => {
        it('does not go to the next step', async() => {
          const wrapper = factory({ attachTo: document.body })

          await wrapper.find('[data-qa="feedback-textarea"]').setValue('This is great!')

          await wrapper.find('[data-qa="feedback next button"]').trigger('click')

          expect(wrapper.vm.currentStep).toBe(1)
          expect(wrapper.emitted('submit')).toBeFalsy(true)
        })
      })
      describe('and it is clicked and it has 5 words minimum', () => {
        it('goes to the next step', async() => {
          const wrapper = factory({ attachTo: document.body })

          await wrapper.find('[data-qa="feedback-textarea"]').setValue('This website is super great!')

          await wrapper.find('[data-qa="feedback next button"]').trigger('click')

          expect(wrapper.vm.currentStep).toBe(2)
          expect(wrapper.emitted()).toHaveProperty('submit')
        })
      })
    })
  })

  describe('send button', () => {
    describe('when there is no value for email', () => {
      it('is disabled', async() => {
        const wrapper = factory()

        await wrapper.vm.goToStep(2)
        await wrapper.find('[data-qa="feedback-email"]').setValue('')

        expect(wrapper.find('[data-qa="feedback send button"]').attributes('disabled')).toBe('')
      })
    })
    describe('when there is a value for email', () => {
      it('is enabled', async() => {
        const wrapper = factory()

        await wrapper.vm.goToStep(2)
        await wrapper.find('[data-qa="feedback-email"]').setValue('example@mail.com')

        expect(wrapper.find('[data-qa="feedback send button"]').attributes('disabled')).toBe(undefined)
      })
    })
  })
})
