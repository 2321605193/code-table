

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'HeaderCell',
  setup(props, {slots}) {

    return () => {
      return (
        <th class='fj-table__header common-padding'>{slots?.default?.()}</th>
      )
    }
  },
})

