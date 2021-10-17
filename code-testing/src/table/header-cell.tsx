

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'HeaderCell',
  setup(props, {slots}) {

    return () => {
      return (
        <th class='fj-table-header__cell common-padding'>{slots?.default?.()}</th>
      )
    }
  },
})

