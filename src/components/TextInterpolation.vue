<script>
// TODO: move to own package: @europeana/vue-text-interpolation
import { h } from 'vue'

export default {
  props: {
    element: {
      type: String,
      default: 'span'
    },
    text: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const slotNames = Object.keys(slots)

    return () =>
      h(
        props.element,
        props.text.split(new RegExp(`({${slotNames.join('}|{')}})`)).map((chunk) => {
          for (const slotName of slotNames) {
            if (chunk === `{${slotName}}`) {
              return h(slots[slotName])
            }
          }
          return chunk
        })
      )
  }
}
</script>
