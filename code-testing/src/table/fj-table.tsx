
import { defineComponent, reactive, ref, watch, provide, computed } from '@vue/composition-api'
import { TableData, tableProps } from './types'
import Table from './table';



export default defineComponent({
  name: 'fjTable',
  props: tableProps,
  setup(props) {

    let tableData: TableData = reactive(props.data)
    let columns = reactive(props.columns)
    const showHeader = ref(props.showHeader);

    let page = ref(1)
    let size = ref(10)

    // 获取table总数据
    const getTableData = ()=>{
      return tableData.values
    }

    const getTableColums = () => {
      return columns.values
    }

    // 分页
    const workingPagingData = (page: number, size: number): TableData => {
      return tableData.slice((page)*size, page*size + 1);
    }

    // 分页、排序后的结果
    const filterTableData = (): TableData => {
      return tableData
    }

    // 页码改变
    const pageChange = (newPage: number) => {
      page.value = newPage;
    }

    // 页码改变
    const sizeChange = (newSize: number) => {
      size.value = newSize;
    }

    provide('tableProvide', {
      filterTableData,
      getTableData,
      getTableColums,
      pageChange,
      sizeChange,
      showHeader
    })

    return () => {
      return (
        <Table /> 
      )
    }
  },
})





