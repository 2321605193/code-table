


import { defineComponent } from '@vue/composition-api'

import TableHeader from './table-header';
import TableBody from './table-body';

export default defineComponent({

  setup() {


    return () => {
      return (
        <table>
          <TableHeader  />
          <TableBody  />
        </table>
      )
    }

  },
})

