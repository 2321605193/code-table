


import { defineComponent } from '@vue/composition-api'

import TableHeader from './table-header';
import TableBody from './table-body';

export default defineComponent({

  setup() {

    return () => {
      return (
        <section class='fj-table'>
       
            <table cellspacing={0} cellpadding={0}>
              <TableHeader  />
            </table>

            <table cellspacing={0} cellpadding={0}>
              <TableBody  />
            </table>
    
        </section>
      )
    }

  },
})

