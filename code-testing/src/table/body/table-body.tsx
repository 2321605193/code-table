



import { defineComponent, inject, reactive, h } from '@vue/composition-api'
import TableRow from './table-row';
import TableCell from './table-cell';
import { isFunction } from 'lodash-es';
export default defineComponent({
  name: 'TableBody',
  setup() {
  const { filterTableData,  tableColumns, paginationOptions} = inject('tableProvide')
    let columns: Record<string, any>[] = reactive(tableColumns);

    return () => {
      let rowList = filterTableData.value.map((row, rowIndex) => {

        let columnsList = columns.map((column, colIndex) => {

          if (column?.type === 'index') {
            return (<TableCell> { (paginationOptions.value.page - 1) * paginationOptions.value.size + rowIndex + 1 } </TableCell>)
          }
         
          if (column.render && isFunction(column.render)) {
  
            return (
              <TableCell>{column.render(row)}</TableCell>
            )
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

      

      return (
        <tbody>{rowList}</tbody>
      )
    }
  },
})

