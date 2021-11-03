



import { defineComponent, inject, reactive, h } from '@vue/composition-api'
import TableRow from './table-row';
import TableCell from './table-cell';
import { Columns, PaginationOptions, ColumnsType, TableData } from '../types';
import { isFunction } from 'lodash-es';
import { VNode } from 'vue';
export default defineComponent({
  name: 'TableBody',
  setup() {
  const { filterTableData,  props, paginationOptions} = inject('tableProvide')

    return () => {
      let rowList = randerColumnsList(filterTableData.value, props.columns, paginationOptions.value)
      return (
        <tbody>{rowList}</tbody>
      )
    }
  },
})


function randerColumnsList(TableData: TableData[], columns: Columns[], paginationOptions: PaginationOptions) {
  return TableData.map((row, rowIndex) => {

    let columnsList = randerColumns(row, columns, paginationOptions, rowIndex);

    return (
      <TableRow row = {rowIndex + 1}> {columnsList} </TableRow>
    )
  })
}

function randerColumns (rowData: Record<string, any>, columns: Columns[], paginationOptions: PaginationOptions, rowIndex: number) { 
  return columns.map((column) => {

    // 序号
    if (column?.type === ColumnsType.index) {
      return randerIndex(paginationOptions, rowIndex)
    }
   
    // 自定义列渲染
    if (column.render && isFunction(column.render)) {
      return randerTableCell(column.render(rowData))
    }
    return randerTableCell(rowData[column.key])
     
  } )
}

// 渲染序号列
function randerIndex (paginationOptions: PaginationOptions, rowIndex: number) {
  return (<TableCell> { (paginationOptions.page - 1) * paginationOptions.size + rowIndex + 1 } </TableCell>)
}

// 渲染表格内容
function randerTableCell (cellContent: VNode | string | null) {
  return (<TableCell>{cellContent}</TableCell>) 
}