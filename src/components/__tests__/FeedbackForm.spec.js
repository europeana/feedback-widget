import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackForm from '../FeedbackForm.vue'
import { useI18n } from "vue-i18n"

vi.mock('vue-i18n')

useI18n.mockReturnValue({
  locale: { value: 'en' },
  t: (key) => key,
})

const factory = (options = {}) => {
  const wrapper = mount(FeedbackForm, {
    // global: {
    //   fetch: vi.fn(),
    //   provide: {
    //     inject: {
    //       apiUrl: 'https://www.europeana.eu/_api/jira-service-desk/feedback',
    //       faqUrl: null,
    //       locale: 'en'
    //     }
    //   },
    //   stubs: { 'i18n-t': true}
    // },
    ...options})
  return wrapper
}

describe('FeedbackForm', () => {
  describe('next button', () => {
    describe('when there is no value for feedback', () => {
      it('is disabled', async() => {
        const wrapper = factory()

        await wrapper.get('[data-qa="feedback textarea"]').setValue('')

        expect(wrapper.get('[data-qa="feedback next button"]').attributes('disabled')).toBe('')
      })
    })
    describe('when there is a value for feedback', () => {
      it('is enabled', async() => {
        const wrapper = factory()

        await wrapper.get('[data-qa="feedback textarea"]').setValue('This website is great!')

        expect(wrapper.get('[data-qa="feedback next button"]').attributes('disabled')).toBe(undefined)
      })
      describe('and it is clicked and it has only 4 words', () => {
        it('does not go to the next step', async() => {
          const wrapper = factory({ attachTo: document.body })

          await wrapper.get('[data-qa="feedback textarea"]').setValue('This is great!')

          await wrapper.get('[data-qa="feedback next button"]').trigger('click')

          expect(wrapper.vm.currentStep).toBe(1)
          expect(wrapper.emitted('submit')).toBeFalsy(true)
        })
      })
      describe('and it is clicked and it has 5 words minimum', () => {
        it('goes to the next step', async() => {
          const wrapper = factory({ attachTo: document.body })

          await wrapper.get('[data-qa="feedback textarea"]').setValue('This website is super great!')

          await wrapper.get('[data-qa="feedback next button"]').trigger('click')

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
        await wrapper.get('[data-qa="feedback email"]').setValue('')

        expect(wrapper.get('[data-qa="feedback send button"]').attributes('disabled')).toBe('')
      })
    })
    describe('when there is a value for email', () => {
      it('is enabled', async() => {
        const wrapper = factory()

        await wrapper.vm.goToStep(2)
        await wrapper.get('[data-qa="feedback email"]').setValue('example@mail.com')

        expect(wrapper.get('[data-qa="feedback send button"]').attributes('disabled')).toBe(undefined)
      })
      describe('and it is clicked', () => {
        it('submits the form', async() => {
          const wrapper = factory({ attachTo: document.body })

          await wrapper.vm.goToStep(2)
          await wrapper.get('[data-qa="feedback email"]').setValue('example@mail.com')

          await wrapper.get('[data-qa="feedback send button"]').trigger('click')

          expect(wrapper.emitted()).toHaveProperty('submit')
        })
      })
    })
  })

  describe('when mounted', () => {
    it('sets focus on the textarea', () => {
      const wrapper = factory({ attachTo: document.body })

      const textAreaWitFocus = wrapper.get('[data-qa="feedback textarea"]:focus')

      expect(textAreaWitFocus.exists()).toBe(true)
    })
  })

  describe('docsUrl', () => {
    it('returns a europeana localised URL', () => {
      const wrapper = factory()

      expect(wrapper.vm.docsUrl('/example-page')).equals('https://www.europeana.eu/en/example-page')
    })
  })

  describe('submitForm', () => {
    // describe('when step is more than 1', () => {
    //   it('sends feedback', async() => {
    //     const wrapper = factory()
    //     const sendFeedbackSpy = vi.spyOn(wrapper.vm, 'sendFeedback')

    //     await wrapper.vm.goToStep(2)
    //     wrapper.vm.submitForm()

    //     expect(sendFeedbackSpy).toHaveBeenCalled()
    //   })
    // })
    describe('when step is less than 3', () => {
      it('sends feedback', async() => {
        const wrapper = factory()

        wrapper.vm.submitForm()
        expect(wrapper.vm.currentStep).equals(2)
      })
    })
  })

  // describe('sendFeedback', () => {
  //   it('posts the feedback message', async() => {
  //     const wrapper = factory()
  //     const postFeedbackMessage = vi.spyOn(wrapper.vm, 'postFeedbackMessage')

  //     await wrapper.vm.goToStep(2)
  //     await wrapper.vm.sendFeedback()

  //     expect(postFeedbackMessage).toHaveBeenCalled()
  //   })
  // })
})
