




import { defineComponent, inject } from '@vue/composition-api'
import TableRow from '../body/table-row';
import HeaderCell from './header-cell';
import SortButton from '../sort-button'
import { Columns, ColumnsType } from '../types';
import { VNode } from 'vue';

export default defineComponent({
  name: 'TableHeader',
  setup () {

    const { tableColumns, headerSlot }  = inject('tableProvide')

    return () => {
      let headerDOM = randerHeader(tableColumns, headerSlot);
      return (
        <thead>
          <TableRow>{headerDOM}</TableRow>
        </thead>
      )
    }
  },
})


function randerHeader (columnsList: Columns[], headerSlot: Record<string, any>) {
  return columnsList.map(column => {

    if (column?.type === ColumnsType.index) {
      return randerIndex()
    }

    if (headerSlot[column.key]) {
      return randerHeaderSlot(headerSlot[column.key](), column)
    }

    return randerHeaderCell(column)
  })
}

// 渲染序号列
function randerIndex () {
  return (
    <HeaderCell>
      <span class='fj-table-header__cell'>序号</span>
    </HeaderCell>
  )
}

function randerHeaderSlot (slotContent: VNode | null, column: Columns) {
  return (
    <HeaderCell>
      {slotContent}
      {column.sortable && <SortButton dataKey={column.key} sortable={column.sortable} />}
    </HeaderCell>
  )
}

// 渲染表头
function randerHeaderCell (column: Columns) {
  return (
    <HeaderCell>
      <div class='fj-table__header-cell'>
        <span class='fj-table-header__cell-title'>{column.title || '-'}</span>
        {column.sortable && <SortButton dataKey={column.key} sortable={column.sortable} />}
      </div>
    </HeaderCell>
  )
}
