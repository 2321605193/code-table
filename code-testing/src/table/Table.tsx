


import { defineComponent, inject } from '@vue/composition-api'

import TableHeader from './header/table-header'
import TableBody from './body/table-body'

export default defineComponent({
  name: 'Table',
  setup() {

    const { props }  = inject('tableProvide')
    return () => {
      return (
        <section class='fj-table-content'>
       
            <table class='fj-table-body' cellspacing={0} cellpadding={0}>
              { !props.headerLess && <TableHeader  /> }
              <TableBody  />
            </table>
        </section>
      )
    }

  },
})

