
  



import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TableCell',
  setup(props, {slots}) {

    return () => {
      return (
        <td class='fj-table__body-cell common-padding'>{slots?.default?.()}</td>
      )
    }
  },
})

