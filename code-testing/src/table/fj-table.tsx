
import { defineComponent, reactive, ref, provide, computed, toRefs } from '@vue/composition-api'
import { tableProps, PaginationOptions } from './types'
import Table from './table';
import Pagination from './pagination';



export default defineComponent({
  name: 'fjTable',
  props: tableProps,
  setup(props) {

    
    let tableData = reactive(props.data)
    let columns = reactive(props.columns)
    const showHeader = ref(props.showHeader)
    let showPagination = ref(props.showPagination)


    let { paginationOptionsChange, paginationOptions } =  usePagination();



    // 获取table总数据
    let getTableColumns = computed(() => {
      return columns
    })

    let total = computed(()=> {
      return tableData.length;
    })

    provide('tableProvide', {
      total,
      filterTableData: computed(() => {
        let templateData = tableData.slice();
        if (getSortRule.value) {
          templateData.sort((curr, next)=> getSortRule.value(curr, next))
        }
        if (showPagination.value) {
          return templateData.slice((paginationOptions.value.page - 1 ) * paginationOptions.value.size, paginationOptions.value.page * paginationOptions.value.size);
        }
        return templateData
        
      }),
      getTableColumns,
      showHeader,
      paginationOptionsChange,
      paginationOptions,
      changeSortRuleAndSortKey,
      getSortKey
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


// 分页器相关
function usePagination () {
  
  let paginationOptions = ref({
    page: 1,
    size: 10
  });

  const paginationOptionsChange = (newPaginationOptions: PaginationOptions) => {
    paginationOptions.value = reactive(newPaginationOptions);
  }

  return {
    paginationOptions,
    paginationOptionsChange
  }

}






