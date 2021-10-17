




import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(props, { slots }) {

    return () => {

      return (
        <tr class='fj-table__row'>{slots?.default?.()}</tr>
      )
    }
  },
})
