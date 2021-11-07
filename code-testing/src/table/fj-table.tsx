
import { defineComponent, reactive, ref, provide, computed, Ref } from '@vue/composition-api'
import { tableProps, TableData, SortOptions, PaginationOptions} from './types'
import Table from './table';
import Pagination from './pagination';
import { useSort } from './composables/use-sort';
import { usePagination } from './composables/use-pagination';
import { useDataSource } from './composables/use-data-source';
import {TABLE_PROVIDE} from './token';

export default defineComponent({
  name: 'fjTable',
  props: tableProps,
  setup(props, {slots}) {

    let { paginationOptionsChange, paginationOptionsValue } =  usePagination(props);
    let { sortOptionsValue, setSortOptions } = useSort();
    let { filterTableData } = useDataSource(props, paginationOptionsValue, sortOptionsValue)

    provide(TABLE_PROVIDE, {
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