




import { defineComponent, inject } from '@vue/composition-api'
import {VNode} from 'vue';
import TableRow from './table-row';
import HeaderCell from './header-cell';
import SortButton from './sort-button'

export default defineComponent({
  name: 'TableHeader',
  setup (props, {slots}) {

    const { getTableColums, showHeader, showIndex }  = inject('tableProvide')
    return () => {
      let children: VNode | VNode[] | null = [];
      const columns: Record<string, any>[] = getTableColums.value

      if (!showHeader.value) {
        children = null
      } else {
        children = columns.map((column: Record<string, any>) => {

          let sortButton = null;
          if (column.sortable) {
            sortButton = SortButton;
          }

          return (
            <HeaderCell>
              <slot name={column.key}>
                <div class='fj-table__header-cell'>
                  <span class='fj-table-header__cell-title'>{column.title}</span>
                  <sortButton dataKey={column.key} sortable={column.sortable} />
                </div>
              </slot>
            </HeaderCell>
          )  
        })
      }

      if (showIndex.value) {
        children?.unshift((
          <HeaderCell>
            <span class='fj-table-header__cell'>序号</span>
          </HeaderCell>
        ))
      }
      
      

      return (
        <thead>
          <TableRow>{children}</TableRow>
        </thead>
      )
    }
  },
})

