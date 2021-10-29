



import { defineComponent, inject, reactive, h } from '@vue/composition-api'
import TableRow from './table-row';
import TableCell from './table-cell';
import { Columns, PaginationOptions, ColumnsType } from '../types';
import { isFunction } from 'lodash-es';
export default defineComponent({
  name: 'TableBody',
  setup() {
  const { filterTableData,  tableColumns, paginationOptions} = inject('tableProvide')

    return () => {
      let rowList = randerColumns(filterTableData.value, tableColumns, paginationOptions.value)
      return (
        <tbody>{rowList}</tbody>
      )
    }
  },
})


function randerColumns(TableData: Record<string, any>[], columns: Columns[], paginationOptions: PaginationOptions) {
  return TableData.map((row, rowIndex) => {

    let columnsList = columns.map((column, colIndex) => {

      // 序号
      if (column?.type === ColumnsType.index) {
        return (<TableCell> { (paginationOptions.page - 1) * paginationOptions.size + rowIndex + 1 } </TableCell>)
      }
     
      // 自定义列渲染
      if (column.render && isFunction(column.render)) {
        return (<TableCell>{column.render(row)}</TableCell>)
      }

       return (
        <TableCell row = {colIndex + 1} col = {colIndex + 1} > 
          <span>{row[column.key]}</span> 
        </TableCell>
       )
    } )

    return (
      <TableRow row = {rowIndex + 1}> {columnsList} </TableRow>
    )
  })
}
