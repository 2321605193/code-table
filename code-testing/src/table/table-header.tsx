




import { defineComponent, inject } from '@vue/composition-api'
import {VNode} from 'vue';
import TableRow from './table-row';
import HeaderCell from './header-cell';
import SortButton from './sort-button'

export default defineComponent({
  setup () {

    const { getTableColums, showHeader, showIndex }  = inject('tableProvide')
    return () => {

      let children: VNode | VNode[] | null = [];
      const columns: Record<string, any>[] = getTableColums.value

      if (!showHeader) {
        children=null
      } else {
        children = columns.map((column: Record<string, any>) => {

          let sortButton = null;
          if (column.sortable) {
            sortButton = SortButton;
          }

          return (
            <HeaderCell>
              <span class='fj-table-header__cell'>{column.title}</span>
              <sortButton />
            </HeaderCell>
          )  
        })
      }

      children?.unshift((
        <HeaderCell>
          <span class='fj-table-header__cell'>序号</span>
        </HeaderCell>
      ))
      

      return (
        <TableRow>{children}</TableRow>
      )
    }
  },
})

