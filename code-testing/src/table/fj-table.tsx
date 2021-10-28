
import { defineComponent, reactive, ref, provide, computed } from '@vue/composition-api'
import { tableProps } from './types'
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

    let page = ref(1)
    let size = ref(10)
    let sortRule = ref(null);
    let sortKey = ref('')

    // 获取table总数据
    let getTableColumns = computed(() => {
      return columns
    })

    let total = computed(()=> {
      return tableData.length;
    })


    let getPage = computed(()=>{
      return page.value;
    })

    let getSize = computed(()=>{
      return size.value;
    })

    let getSortRule = computed(() => {
      return sortRule.value
    })

    let getSortKey = computed(() => {
      return sortKey.value
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


    let changeSortRuleAndSortKey = (sort: Function, key: string) => {
      sortRule.value = sort;
      sortKey.value = key;
    }

  

    provide('tableProvide', {
      total,
      filterTableData: computed(() => {
        let templateData = tableData.slice();
        if (getSortRule.value) {
          templateData.sort((curr, next)=> getSortRule.value(curr, next))
        }
        if (showPagination.value) {
          return templateData.slice((page.value - 1 ) * size.value, page.value * size.value);
        }
        return templateData
        
      }),
      getTableColumns,
      pageChange,
      sizeChange,
      showHeader,
      getPage,
      getSize,
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





