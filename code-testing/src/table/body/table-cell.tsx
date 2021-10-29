
  



import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TableCell',
  props: {
    row: {
      type: Number
    },
    col: {
      type: Number
    }
  },
  setup(props, {slots}) {

    return () => {

      let key = `${props.row}-${props.col}`;
      return (
        <td class='fj-table__body-cell common-padding' key = {key}>{slots?.default?.()}</td>
      )
    }
  },
})

