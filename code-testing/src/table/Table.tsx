


import { defineComponent } from '@vue/composition-api'

import TableHeader from './table-header';
import TableBody from './table-body';

export default defineComponent({
  name: 'Table',
  setup() {

    return () => {
      return (
        <section class='fj-table-content'>
       
            <table class='fj-table-body' cellspacing={0} cellpadding={0}>
              <TableHeader  />
              <TableBody  />
            </table>
        </section>
      )
    }

  },
})

