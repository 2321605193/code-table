
import { computed, Ref } from '@vue/composition-api'
import { SortOptions, PaginationOptions} from '../types'

export function useDataSource (props: Record<string, any>, paginationOptions: Ref<PaginationOptions>, sortOptions: Ref<SortOptions>) {

    let tableData =  props.data;

    let filterTableData = computed(() => {
      let templateData = tableData.slice();
      if (sortOptions.value.sortRule) {
        templateData.sort((curr, next)=> sortOptions.value.sortRule?.(curr, next))
      }
    
      if (!props.paginationLess) {
        return templateData.slice((paginationOptions.value.page - 1 ) * paginationOptions.value.size, paginationOptions.value.page * paginationOptions.value.size);
      }
      return templateData
      
    })
  
    return {
      filterTableData
    }
  }