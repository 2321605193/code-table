
import { defineComponent, reactive, ref, provide, computed, Ref } from '@vue/composition-api'
import { tableProps, TableData, SortOptions, PaginationOptions} from './types'
import Table from './table';
import Pagination from './pagination';
import { useSort } from './hooks/use-sort';
import { usePagination } from './hooks/use-pagination';
import { useDataSource } from './hooks/use-data-source';



export default defineComponent({
  name: 'fjTable',
  props: tableProps,
  setup(props, {slots}) {


    let headerSlot = reactive(slots)
    let tableColumns = reactive(props.columns)
    const headerLess = ref(props.headerLess)
    const paginationLess = ref(props.paginationLess)

    let total = computed(()=> {
      return props.data.length;
    })

    let { paginationOptionsChange, paginationOptions } =  usePagination();
    let { sortOptions, setSortOptions } = useSort();
    let { filterTableData } = useDataSource(props.data, paginationOptions, sortOptions, paginationLess)

    provide('tableProvide', {
      total,
      headerSlot,
      filterTableData,
      tableColumns,
      headerLess,
      paginationOptionsChange,
      paginationOptions,
      setSortOptions,
      sortOptions
    })

    return () => {
      return (
        <section class='fj-table'>
          <Table /> 
          <br/>
          {!paginationLess.value && <Pagination />}
        </section>
      )
    }
  },
})