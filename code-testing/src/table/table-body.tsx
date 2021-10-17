



import { defineComponent, inject, reactive } from '@vue/composition-api'
import { TableData } from './types';
import TableRow from './table-row';
import TableCell from './table-cell';
export default defineComponent({
  name: 'TableBody',
  setup() {
  const { filterTableData,  getTableColums, showIndex} = inject('tableProvide')
    let columns: Record<string, any>[] = reactive(getTableColums.value);

    return () => {
      let rowList = filterTableData.value.map((row, rowIndex) => {

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

