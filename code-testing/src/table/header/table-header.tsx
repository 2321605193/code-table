




import { defineComponent, inject } from '@vue/composition-api'
import TableRow from '../body/table-row';
import HeaderCell from './header-cell';
import SortButton from '../sort-button'
import { Columns, ColumnsType } from '../types';
import { VNode } from 'vue';

export default defineComponent({
  name: 'TableHeader',
  setup () {

    const { props, slots }  = inject('tableProvide')

    return () => {
      let headerDOM = randerHeader(props.columns, slots);
      // console.log(headerDOM);
      return (
        <thead>
          <TableRow>{headerDOM}</TableRow>
        </thead>
      )
    }
  },
})


function randerHeader (columnsList: Columns[], headerSlot: Record<string, any>) {

  // console.trace('randerHeader columnsList', columnsList)
  // console.trace('randerHeader headerSlot', headerSlot)

  return columnsList.map(column => {

    if (column?.type === ColumnsType.index) {
      return randerIndex()
    }

    let content = headerSlot[column.key] ? headerSlot[column.key]() : (column.title || '-')
  
    return randerHeaderCell(content, column)
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

// 渲染表头
function randerHeaderCell (content: VNode |string | null, column: Columns) {
  return (
    <HeaderCell>
      <span class='fj-table-header__cell-title'>{content}</span>
      {column.sortable && <SortButton dataKey={column.key} sortable={column.sortable} />}
    </HeaderCell>
  )
}
