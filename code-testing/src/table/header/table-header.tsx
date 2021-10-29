




import { defineComponent, inject } from '@vue/composition-api'
import {VNode} from 'vue';
import TableRow from '../body/table-row';
import HeaderCell from './header-cell';
import SortButton from '../sort-button'
import { Columns, ColumnsType } from '../types';

export default defineComponent({
  name: 'TableHeader',
  setup () {

    const { tableColumns, headerLess }  = inject('tableProvide')

    return () => {
      let children: VNode | VNode[] | null = [];
      if (headerLess.value) {
        children = null
      } else {
        children = randerHeader(tableColumns)
      }

      return (
        <thead>
          <TableRow>{children}</TableRow>
        </thead>
      )
    }
  },
})


function randerHeader (columnsList: Columns[]) {
  return columnsList.map((column: Record<string, any>) => {

    if (column?.type === ColumnsType.index) {
      return (
        <HeaderCell>
          <span class='fj-table-header__cell'>序号</span>
        </HeaderCell>
      )
    }

    let sortButton = null;
    if (column.sortable) {
      sortButton = SortButton;
    }

    return (
      <HeaderCell>
        <div class='fj-table__header-cell'>
          <span class='fj-table-header__cell-title'>{column.title}</span>
          <sortButton dataKey={column.key} sortable={column.sortable} />
        </div>
      </HeaderCell>
    )  
  })
}
