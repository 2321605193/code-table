
import { computed, DeepReadonly, Ref } from '@vue/composition-api'
import { SortOptions, PaginationOptionsValue, UserDataSource, TableData} from '../types'

export function useDataSource (
  props: Record<string, any>, 
  paginationOptions: PaginationOptionsValue, 
  sortOptions: DeepReadonly<Ref<SortOptions>>
  ): UserDataSource {

  // console.trace('useDataSource data', props.data)
  // console.trace('useDataSource paginationOptions', paginationOptions.value)
  // console.trace('useDataSource sortOptions', sortOptions.value)


    // 排序分页后的结果
    let filterTableData = computed(() => {
      let templateData: TableData = props.data.slice();
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