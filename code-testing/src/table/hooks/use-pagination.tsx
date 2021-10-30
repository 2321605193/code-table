// 分页器相关

import { Ref, ref  } from '@vue/composition-api'
import { PaginationOptions} from '../types'

export function usePagination () {
  
    let paginationOptions: Ref<PaginationOptions> = ref({
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