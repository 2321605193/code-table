



import { defineComponent, inject } from '@vue/composition-api'
import { TableData } from './types';
import TableRow from './table-row';
import TableCell from './table-cell';
export default defineComponent({
  setup() {
  const { filterTableData,  getTableColums, showIndex} = inject('tableProvide')
    let columns: Record<string, any>[] = getTableColums.value;
    let showTableData: TableData = filterTableData.value;
    return () => {
      let rowList = showTableData.map((row, rowIndex) => {

        let columnsList = columns.map((column, colIndex) => {
           return (
            <TableCell row = {colIndex + 1} col = {colIndex + 1} > 
              <span>{row[column.key]}</span> 
            </TableCell>
           )
        } )

        

        if (showIndex) {
          columnsList.unshift((
            <TableCell> { rowIndex + 1 } </TableCell>
          ))
        }

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

