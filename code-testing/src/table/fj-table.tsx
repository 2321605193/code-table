
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import { TableData, tableProps } from './types'
import Table from './table';



export default defineComponent({
  name: 'fjTable',
  props: tableProps,
  setup(props) {

    let tableData: TableData = reactive(props.data)
    let showTableData: TableData = reactive(tableData)
    let page = ref(1)
    let size = ref(10)

    const workingPagingData = (page: number, size: number): TableData => {
      return tableData.slice((page)*size, page*size + 1);
    }

    watch(page, (newValue) => {
      showTableData = workingPagingData(newValue, size.value);
    })

    return () => {
      return (
        <Table tableDate={showTableData}/> 
      )
    }
  },
})





