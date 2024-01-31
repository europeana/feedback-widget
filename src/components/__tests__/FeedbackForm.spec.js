import { describe, it, expect, vi, afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

import { mount, flushPromises } from '@vue/test-utils'
import FeedbackForm from '../FeedbackForm.vue'
import { useI18n } from "vue-i18n"

vi.mock('vue-i18n')

useI18n.mockReturnValue({
  locale: { value: 'en' },
  t: (key) => key,
})

const responseStatus = { 
  status: 200,
  statusText: "OK"
}

export const restHandlers = [
   http.post('https://www.europeana.eu/_api/jira-service-desk/feedback', () => {
    return new HttpResponse(null, responseStatus)
  }),
]
const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

const factory = (options = {}) => {
  const wrapper = mount(FeedbackForm, options)
  return wrapper
}

describe('FeedbackForm', () => {
  it('sets focus on the textarea', () => {
    const wrapper = factory({ attachTo: document.body })

    const textAreaWitFocus = wrapper.find('[data-qa="feedback textarea"]:focus')

    expect(textAreaWitFocus.exists()).toBe(true)
  })

  describe('next button at step 1', () => {
    const wrapper = factory({ attachTo: document.body })

    describe('when there is no value for feedback', () => {
      it('is disabled', async() => {
        await wrapper.find('[data-qa="feedback textarea"]').setValue('')

        expect(wrapper.find('[data-qa="feedback next button"]').attributes('disabled')).toEqual('')
        await wrapper.find('[data-qa="feedback next button"]').trigger('click')

        expect(wrapper.vm.currentStep).toBe(1)
        expect(wrapper.emitted('submit')).toBeFalsy(true)
      })
    })
    describe('when the textarea has input', () => {  
      it('is enabled', async() => {
        await wrapper.find('[data-qa="feedback textarea"]').setValue('This')
        expect(wrapper.find('[data-qa="feedback next button"]').attributes('disabled')).toBe(undefined)
      })
      describe('when the textarea input has less than 5 words', () => {  
        it('does not go to the next step when clicked', async() => {
          await wrapper.find('[data-qa="feedback textarea"]').setValue('This is great')
          await wrapper.find('[data-qa="feedback next button"]').trigger('click')

          expect(wrapper.vm.currentStep).toBe(1)
          expect(wrapper.emitted('submit')).toBeFalsy(true)
        })
      })
    })
    describe('when the textarea input has 5 words minimum', () => {
      it('submits the form and goes to the next step when clicked', async() => {
        await wrapper.find('[data-qa="feedback textarea"]').setValue('This website is super great!')
        await wrapper.find('[data-qa="feedback next button"]').trigger('click')

        expect(wrapper.vm.currentStep).toBe(2)
        expect(wrapper.emitted()).toHaveProperty('submit')
      })
    })
  })

  describe('send button at step 2', async() => {
    const wrapper = factory({ attachTo: document.body })

    await wrapper.find('[data-qa="feedback textarea"]').setValue('This website is super great!')
    await wrapper.find('[data-qa="feedback next button"]').trigger('click')

    describe('when there is no value for email', () => {
      it('is disabled', async() => {
        await wrapper.find('[data-qa="feedback email"]').setValue('')
        await wrapper.find('[data-qa="feedback send button"]').trigger('click')

        expect(wrapper.find('[data-qa="feedback send button"]').attributes('disabled')).toBe('')
        expect(wrapper.vm.currentStep).toBe(2)
        expect(wrapper.emitted('submit')).toHaveLength(1)
      })
    })
    describe('when there is a value for email', () => {
      it('is enabled', async() => {
        await wrapper.find('[data-qa="feedback email"]').setValue('example')

        expect(wrapper.find('[data-qa="feedback send button"]').attributes('disabled')).toBe(undefined)
      })
      describe('and it is clicked', () => {
        describe('and the email value is invalid', () => {
          it('does not submit the form and stays at step 2', async() => {
            await wrapper.find('[data-qa="feedback email"]').setValue('example invalid email')
            await wrapper.find('[data-qa="feedback send button"]').trigger('click')
  
            expect(wrapper.emitted('submit')).toHaveLength(1)
            expect(wrapper.vm.currentStep).toBe(2)
          })
        })
        describe('and the email value is valid', () => {
          it('submits the form and goes to the next step', async() => {
            await wrapper.find('[data-qa="feedback email"]').setValue('example@mail.com')
            await wrapper.find('[data-qa="feedback send button"]').trigger('click')
            await flushPromises()

            expect(wrapper.vm.currentStep).toBe(3)
            expect(wrapper.emitted('submit')).toHaveLength(2)
          })
        })
      })
    })
  })

  describe('cancel button', () => {
    describe('when clicked at step 1', () => {
      it('closes the dialog', async() => {
        const wrapper = factory()

        await wrapper.find('[data-qa="feedback cancel button"]').trigger('click')

        expect(wrapper.emitted('hide')).toHaveLength(1)
      })
    })
    describe('when clicked at step 2', () => {
      it('closes the dialog', async() => {
        const wrapper = factory({ attachTo: document.body })

        await wrapper.find('[data-qa="feedback textarea"]').setValue('This website is super great!')
        await wrapper.find('[data-qa="feedback next button"]').trigger('click')

        expect(wrapper.vm.currentStep).toBe(2)

        await wrapper.find('[data-qa="feedback cancel button"]').trigger('click')

        expect(wrapper.emitted('hide')).toHaveLength(1)
      })
    })

    describe('at step 3', () => {
      describe('when the request fails and when clicked', () => {
        it('closes the dialog', async() => {
          const wrapper = factory({ attachTo: document.body })
          // Set error response status
          responseStatus.status = 500
          responseStatus.statusText = 'Internal sever error'

          await wrapper.find('[data-qa="feedback textarea"]').setValue('This website is super great!')
          await wrapper.find('[data-qa="feedback next button"]').trigger('click')

          expect(wrapper.vm.currentStep).toBe(2)

          await wrapper.find('[data-qa="feedback skip button"]').trigger('click')

          await flushPromises()

          expect(wrapper.vm.currentStep).toBe(3)

          await wrapper.find('[data-qa="feedback cancel button"]').trigger('click')

          expect(wrapper.emitted('hide')).toHaveLength(1)

          // Reset to succesful response status
          responseStatus.status = 200
          responseStatus.statusText = 'OK'
        })
      })
      describe('when the request succeeds', () => {
        it('does not exist', async() => {
          const wrapper = factory({ attachTo: document.body })


          await wrapper.find('[data-qa="feedback textarea"]').setValue('This website is super great!')
          await wrapper.find('[data-qa="feedback next button"]').trigger('click')

          expect(wrapper.vm.currentStep).toBe(2)

          await wrapper.find('[data-qa="feedback skip button"]').trigger('click')
          await flushPromises()

          expect(wrapper.vm.currentStep).toBe(3)
          expect(wrapper.find('[data-qa="feedback cancel button"]').exists()).toBe(false)
        })
      })
    })
  })
})
