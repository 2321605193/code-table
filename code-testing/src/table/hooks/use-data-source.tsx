
import { computed, Ref } from '@vue/composition-api'
import { TableData, SortOptions, PaginationOptions} from '../types'

export function useDataSource (tableData: TableData, paginationOptions: Ref<PaginationOptions>, sortOptions: Ref<SortOptions>, paginationLess: Ref<Boolean>) {


    let filterTableData = computed(() => {
      let templateData = tableData.slice();
      if (sortOptions.value.sortRule) {
        templateData.sort((curr, next)=> sortOptions.value.sortRule?.(curr, next))
      }
    
      if (!paginationLess.value) {
        return templateData.slice((paginationOptions.value.page - 1 ) * paginationOptions.value.size, paginationOptions.value.page * paginationOptions.value.size);
      }
      return templateData
      
    })
  
    return {
      filterTableData
    }
  }