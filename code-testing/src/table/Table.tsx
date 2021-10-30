


import { defineComponent, inject } from '@vue/composition-api'

import TableHeader from './header/table-header'
import TableBody from './body/table-body'

export default defineComponent({
  name: 'Table',
  setup(props, {slots}) {

    const { headerLess }  = inject('tableProvide')
    return () => {
      return (
        <section class='fj-table-content'>
       
            <table class='fj-table-body' cellspacing={0} cellpadding={0}>
              { !headerLess.value && <TableHeader  /> }
              <TableBody  />
            </table>
        </section>
      )
    }

  },
})

