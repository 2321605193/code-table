
import { defineComponent, reactive, ref, provide, computed, Ref } from '@vue/composition-api'
import { isFunction } from 'lodash-es';
import { tableProps, PaginationOptions, SortOptions, SortOrderBy, SortAble } from './types'
import Table from './table';
import Pagination from './pagination';



export default defineComponent({
  name: 'fjTable',
  props: tableProps,
  setup(props, {slots}) {


    let headerSlot = reactive(slots)
    let tableData = reactive(props.data)
    let tableColumns = reactive(props.columns)
    const headerLess = ref(props.headerLess)
    const paginationLess = ref(props.paginationLess)

   


    let total = computed(()=> {
      return tableData.length;
    })

    let { paginationOptionsChange, paginationOptions } =  usePagination();
    let { sortOptions, setSortOptions } = useSort();

    provide('tableProvide', {
      total,
      headerSlot,
      filterTableData: computed(() => {
        let templateData = tableData.slice();
        if (sortOptions.value.sortRule) {
          templateData.sort((curr, next)=> sortOptions.value.sortRule?.(curr, next))
        }
        if (!paginationLess.value) {
          return templateData.slice((paginationOptions.value.page - 1 ) * paginationOptions.value.size, paginationOptions.value.page * paginationOptions.value.size);
        }
        return templateData
        
      }),
      tableColumns,
      headerLess,
      paginationOptionsChange,
      paginationOptions,
      setSortOptions,
      sortOptions
    })

    return () => {
      let pagination = !paginationLess.value ? Pagination : null;

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
    paginationOptions.value = newPaginationOptions;
  }

  return {
    paginationOptions,
    paginationOptionsChange
  }

}

// 排序相关
function useSort() {

  let defaultOrder = [SortOrderBy.desc, SortOrderBy.asc, SortOrderBy.default];
  

  let sortOptions: Ref<SortOptions> = ref({
    sortRule: (curr: number, next: number) => curr - next,
    sortKey: '',
    activeOrderBy: SortOrderBy.default
  })

  let oderFlag = computed(() => {
    return sortOptions.value.activeOrderBy === SortOrderBy.desc ? -1 : 1
  })

  

  let setSortOptions = (sortable: SortAble | Boolean, key: string) => {

    let deafultSort = (curr: Record<string, any>, next: Record<string, any>) => curr[key] - next[key];
    
    // 有自定义排序规则使用自定义，否则使用默认值
    let sortFunction = (sortable.sorter && isFunction(sortable.sorter)) ? sortable.sorter : deafultSort

    // 排序方式
    let order = sortable?.orderBy ? sortable.orderBy : defaultOrder
    //下一个排序规则
    let nextOrderBy = order.indexOf(sortOptions.value.activeOrderBy) === -1 ? SortOrderBy.desc : order[order.indexOf(sortOptions.value.activeOrderBy) + 1]
    
    sortOptions.value.activeOrderBy =  key === sortOptions.value.sortKey  && nextOrderBy ? nextOrderBy : SortOrderBy.desc
    sortOptions.value.sortRule = sortOptions.value.activeOrderBy === SortOrderBy.default ? null : (curr: Record<string, any>, next: Record<string, any>) => oderFlag.value * sortFunction(curr, next);
    sortOptions.value.sortKey = key;

  }

  return {
    sortOptions,
    setSortOptions
  }

}





