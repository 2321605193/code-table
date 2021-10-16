




import { defineComponent, inject } from '@vue/composition-api'
import {VNode} from 'vue';
import TableRow from './table-row';
import TableCell from './table-cell';
import SortButton from './sort-button'

export default defineComponent({
  setup () {

    const { getTableColums, showHeader }  = inject('tableProvide')
    return () => {

      let children: VNode | VNode[] | null = [];
      const columns: Record<string, any>[] = []

      if (!showHeader) {
        children=null
      } else {
        children = columns.map((column: Record<string, any>) => {

          let sortButton = null;
          if (column.sortable) {
            sortButton = SortButton;
          }

          return <TableCell key={column.key}>
              <span>{column.title}</span>
              <sortButton />
            </TableCell>  
        })
      }

      

      return (
        <TableRow>{children}</TableRow>
      )
    }
  },
})

