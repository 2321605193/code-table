
import { defineComponent, reactive, ref, provide, computed } from '@vue/composition-api'
import { TableData, tableProps } from './types'
import Table from './table';
import Pagination from './pagination';



export default defineComponent({
  name: 'fjTable',
  props: tableProps,
  setup(props) {

    let tableData: TableData = reactive(props.data)
    let columns = reactive(props.columns)
    const showHeader = ref(props.showHeader)
    const showIndex = ref(props.showIndex)
    let showPagination = ref(props.showPagination)

    let page = ref(1)
    let size = ref(10)

    // 获取table总数据
    let getTableData = computed(()=>{
      return tableData
    })

    let getTableColums = computed(() => {
      return columns
    })

    let total = computed(()=> {
      return tableData.length;
    })





    // 分页、排序后的结果
    // 页码改变
    const pageChange = (newPage: number) => {
      page.value = newPage;
    }

    // 页码改变
    const sizeChange = (newSize: number) => {
      size.value = newSize;
    }

    provide('tableProvide', {
      showIndex,
      total,
      filterTableData: computed(() => {
        return tableData.slice((page.value - 1 ) * size.value, page.value * size.value);
      }),
      getTableData,
      getTableColums,
      pageChange,
      sizeChange,
      showHeader,
      page,
      size
    })

    return () => {
      let pagination = showPagination.value ? Pagination : null;

      return (
        <section class='fj-table'>
          <Table /> 
          <br/>
          <pagination />
        </section>
      )
    }
  },
})





