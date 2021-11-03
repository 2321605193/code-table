
import { computed, Ref, ComputedRef } from '@vue/composition-api'
import { SortOptions, PaginationOptions} from '../types'

export function useDataSource (props: Record<string, any>, paginationOptions: ComputedRef<PaginationOptions>, sortOptions: Ref<SortOptions>) {

  // console.trace('useDataSource data', props.data)
  // console.trace('useDataSource paginationOptions', paginationOptions.value)
  // console.trace('useDataSource sortOptions', sortOptions.value)

    let tableData =  props.data;


    // 排序分页后的结果
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

    // console.log(filterTableData.value)
  
    return {
      filterTableData
    }
  }