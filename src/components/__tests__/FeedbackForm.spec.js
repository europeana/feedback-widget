import { describe, it, expect, vi, afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

import { mount, flushPromises } from '@vue/test-utils'
import FeedbackForm from '../FeedbackForm.vue'
import { useI18n } from 'vue-i18n'

vi.mock('vue-i18n')

useI18n.mockReturnValue({
  locale: { value: 'en' },
  t: (key) => key
})

const responseStatus = {
  status: 200,
  statusText: 'OK'
}

export const restHandlers = [
  http.post('https://www.europeana.eu/_api/jira-service-desk/feedback', () => {
    return new HttpResponse(null, responseStatus)
  })
]
const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

//shortcut to step 2
const goToStep2 = async (wrapper) => {
  await wrapper.find('[data-qa="feedback textarea"]').setValue('This website is super great!')
  await wrapper.find('[data-qa="feedback next button"]').trigger('click')

  expect(wrapper.vm.currentStep).toBe(2)
}
// shortcut to step 3
const goToStep3 = async (wrapper) => {
  await goToStep2(wrapper)

  await wrapper.find('[data-qa="feedback skip button"]').trigger('click')
  await flushPromises()

  expect(wrapper.vm.currentStep).toBe(3)
}

const factory = (options = {}) => {
  const wrapper = mount(FeedbackForm, {
    global: {
      stubs: { 'i18n-t': { template: '<div><slot /></div>' } }
    },
    ...options
  })
  return wrapper
}

describe('FeedbackForm', () => {
  describe('textarea input field', () => {
    it('receives focus', () => {
      const wrapper = factory({ attachTo: document.body })

      const textAreaWitFocus = wrapper.find('[data-qa="feedback textarea"]:focus')

      expect(textAreaWitFocus.exists()).toBe(true)
    })
    describe('when submitted and the input has less than 5 words', async () => {
      const wrapper = factory({ attachTo: document.body })

      await wrapper.find('[data-qa="feedback textarea"]').setValue('This is great')
      await wrapper.find('[data-qa="feedback next button"]').trigger('click')

      it('has the "is-invalid" class', async () => {
        const textAreaInvalid = wrapper.find('[data-qa="feedback textarea"].is-invalid')

        expect(textAreaInvalid.exists()).toBe(true)
      })
      it('has the aria-invalid attribute set', async () => {
        const textAreaInvalid = wrapper.find('[data-qa="feedback textarea"]')

        expect(textAreaInvalid.attributes('aria-invalid')).toEqual('true')
      })
    })
  })

  describe('email input field', () => {
    it('receives focus', async () => {
      const wrapper = factory({ attachTo: document.body })

      await goToStep2(wrapper)

      const emailWitFocus = wrapper.find('[data-qa="feedback email"]:focus')

      expect(emailWitFocus.exists()).toBe(true)
    })
    describe('when submitted and the input is an invalid email', async () => {
      const wrapper = factory({ attachTo: document.body })

      await goToStep2(wrapper)

      await wrapper.find('[data-qa="feedback email"]').setValue('example')
      await wrapper.find('[data-qa="feedback send button"]').trigger('click')

      it('has the "is-invalid" class', async () => {
        const emailInvalid = wrapper.find('[data-qa="feedback email"].is-invalid')

        expect(emailInvalid.exists()).toBe(true)
      })
      it('has the aria-invalid attribute set', async () => {
        const emailInvalid = wrapper.find('[data-qa="feedback email"]')

        expect(emailInvalid.attributes('aria-invalid')).toEqual('true')
      })
    })
  })

  describe('email help text', () => {
    it('has a link to terms of service and privacy policy', async () => {
      const wrapper = factory({ attachTo: document.body })

      await goToStep2(wrapper)

      const termsLink = wrapper.find(
        '[data-qa="feedback email helptext"] a[href="https://www.europeana.eu/en/rights"]'
      )
      const privacyLink = wrapper.find(
        '[data-qa="feedback email helptext"] a[href="https://www.europeana.eu/en/rights/privacy-policy"]'
      )

      expect(termsLink.exists()).toBe(true)
      expect(privacyLink.exists()).toBe(true)
    })
  })

  describe('next button at step 1', () => {
    const wrapper = factory({ attachTo: document.body })

    describe('when there is no value for feedback', () => {
      it('is disabled', async () => {
        await wrapper.find('[data-qa="feedback textarea"]').setValue('')

        expect(wrapper.find('[data-qa="feedback next button"]').attributes('disabled')).toEqual('')
        await wrapper.find('[data-qa="feedback next button"]').trigger('click')

        expect(wrapper.vm.currentStep).toBe(1)
        expect(wrapper.emitted('submit')).toBeFalsy(true)
      })
    })
    describe('when the textarea has input', () => {
      it('is enabled', async () => {
        await wrapper.find('[data-qa="feedback textarea"]').setValue('This')
        expect(wrapper.find('[data-qa="feedback next button"]').attributes('disabled')).toBe(
          undefined
        )
      })
      describe('when the textarea input has less than 5 words', () => {
        it('does not go to the next step when clicked', async () => {
          await wrapper.find('[data-qa="feedback textarea"]').setValue('This is great')
          await wrapper.find('[data-qa="feedback next button"]').trigger('click')

          expect(wrapper.vm.currentStep).toBe(1)
          expect(wrapper.emitted('submit')).toBeFalsy(true)
        })
      })
    })
    describe('when the textarea input has 5 words minimum', () => {
      it('submits the form and goes to the next step when clicked', async () => {
        await wrapper.find('[data-qa="feedback textarea"]').setValue('This website is super great!')
        await wrapper.find('[data-qa="feedback next button"]').trigger('click')

        expect(wrapper.vm.currentStep).toBe(2)
        expect(wrapper.emitted()).toHaveProperty('submit')
      })
    })
  })

  describe('send button at step 2', async () => {
    const wrapper = factory({ attachTo: document.body })

    await goToStep2(wrapper)

    describe('when there is no value for email', () => {
      it('is disabled', async () => {
        await wrapper.find('[data-qa="feedback email"]').setValue('')
        await wrapper.find('[data-qa="feedback send button"]').trigger('click')

        expect(wrapper.find('[data-qa="feedback send button"]').attributes('disabled')).toBe('')
        expect(wrapper.vm.currentStep).toBe(2)
        expect(wrapper.emitted('submit')).toHaveLength(1)
      })
    })
    describe('when there is a value for email', () => {
      it('is enabled', async () => {
        await wrapper.find('[data-qa="feedback email"]').setValue('example')

        expect(wrapper.find('[data-qa="feedback send button"]').attributes('disabled')).toBe(
          undefined
        )
      })
      describe('and it is clicked', () => {
        describe('and the email value is invalid', () => {
          it('does not submit the form and stays at step 2', async () => {
            await wrapper.find('[data-qa="feedback email"]').setValue('example invalid email')
            await wrapper.find('[data-qa="feedback send button"]').trigger('click')

            expect(wrapper.emitted('submit')).toHaveLength(1)
            expect(wrapper.vm.currentStep).toBe(2)
          })
        })
        describe('and the email value is valid', () => {
          it('submits the form and goes to the next step', async () => {
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
      it('closes the dialog', async () => {
        const wrapper = factory()

        await wrapper.find('[data-qa="feedback cancel button"]').trigger('click')

        expect(wrapper.emitted('hide')).toHaveLength(1)
      })
    })
    describe('when clicked at step 2', () => {
      it('closes the dialog', async () => {
        const wrapper = factory({ attachTo: document.body })

        await goToStep2(wrapper)

        await wrapper.find('[data-qa="feedback cancel button"]').trigger('click')

        expect(wrapper.emitted('hide')).toHaveLength(1)
      })
    })

    describe('at step 3', () => {
      describe('when the request fails and when clicked', () => {
        it('closes the dialog', async () => {
          const wrapper = factory({ attachTo: document.body })
          // Set error response status
          responseStatus.status = 500
          responseStatus.statusText = 'Internal sever error'

          await goToStep3(wrapper)

          await wrapper.find('[data-qa="feedback cancel button"]').trigger('click')

          expect(wrapper.emitted('hide')).toHaveLength(1)

          // Reset to succesful response status
          responseStatus.status = 200
          responseStatus.statusText = 'OK'
        })
      })
      describe('when the request succeeds', () => {
        it('does not exist', async () => {
          const wrapper = factory({ attachTo: document.body })

          await goToStep3(wrapper)

          expect(wrapper.find('[data-qa="feedback cancel button"]').exists()).toBe(false)
        })
      })
    })
  })

  describe('close button', () => {
    describe('when at step 1 or 2', () => {
      it('does not exist', async () => {
        const wrapper = factory({ attachTo: document.body })

        expect(wrapper.find('[data-qa="feedback close button"]').exists()).toBe(false)

        await goToStep2(wrapper)

        expect(wrapper.find('[data-qa="feedback close button"]').exists()).toBe(false)
      })
    })
    describe('at step 3', () => {
      describe('when the request fails', () => {
        it('does not exist', async () => {
          const wrapper = factory({ attachTo: document.body })
          // Set error response status
          responseStatus.status = 500
          responseStatus.statusText = 'Internal sever error'

          await goToStep3(wrapper)

          expect(wrapper.find('[data-qa="feedback close button"]').exists()).toBe(false)

          // Reset to succesful response status
          responseStatus.status = 200
          responseStatus.statusText = 'OK'
        })
      })
      describe('when the request succeeds', () => {
        it('closes the dialog when clicked', async () => {
          const wrapper = factory({ attachTo: document.body })

          await goToStep3(wrapper)

          await wrapper.find('[data-qa="feedback close button"]').trigger('click')

          expect(wrapper.emitted('hide')).toHaveLength(1)
        })
      })
    })
  })

  describe('When the feedback request succeeds', async () => {
    it('displays text including "success"', async () => {
      const wrapper = factory({ attachTo: document.body })

      await goToStep2(wrapper)

      expect(wrapper.vm.currentStep).toBe(2)

      await wrapper.find('[data-qa="feedback skip button"]').trigger('click')
      await flushPromises()

      expect(wrapper.vm.currentStep).toBe(3)

      const step3 = wrapper.find('[data-qa="feedback request status message"]')

      expect(step3.text()).includes('success')
    })
  })

  describe('When the feedback request fails', async () => {
    it('displays text including "failed"', async () => {
      const wrapper = factory({ attachTo: document.body })
      // Set error response status
      responseStatus.status = 500
      responseStatus.statusText = 'Internal sever error'

      await goToStep2(wrapper)

      expect(wrapper.vm.currentStep).toBe(2)

      await wrapper.find('[data-qa="feedback skip button"]').trigger('click')
      await flushPromises()

      expect(wrapper.vm.currentStep).toBe(3)

      const step3 = wrapper.find('[data-qa="feedback request status message"]')

      expect(step3.text()).includes('failed')
      // Reset to succesful response status
      responseStatus.status = 200
      responseStatus.statusText = 'OK'
    })
  })

  describe('When an FAQ URL is provided in the config', () => {
    it('is rendered as a link', () => {
      const faqUrl = 'https://www.europeana.eu/faq'
      const wrapper = factory({
        global: {
          provide: {
            config: {
              apiUrl: 'https://www.europeana.eu/_api/jira-service-desk/feedback',
              faqUrl,
              locale: 'en'
            }
          }
        }
      })

      const faqLink = wrapper.find(`a[href="${faqUrl}"]`)

      expect(faqLink.exists()).toBe(true)
    })
  })
})
