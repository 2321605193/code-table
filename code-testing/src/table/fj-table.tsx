
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

    let { paginationOptionsChange, paginationOptionsValue } =  usePagination(props);
    let { sortOptionsValue, setSortOptions } = useSort();
    let { filterTableData } = useDataSource(props, paginationOptionsValue, sortOptionsValue)

    provide('tableProvide', {
      props,
      slots,
      filterTableData,
      paginationOptionsChange,
      paginationOptionsValue,
      setSortOptions,
      sortOptionsValue
    })

    return () => {
      return (
        <section class='fj-table'>
          <Table /> 
          <br/>
          {!props.paginationLess && <Pagination />}
        </section>
      )
    }
  },
})