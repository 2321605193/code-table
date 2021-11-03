// 分页器相关

import { Ref, ref  } from '@vue/composition-api'
import { PaginationOptions} from '../types'

export function usePagination (props: Record<string, any>) {
  
    let paginationOptions: Ref<PaginationOptions> = ref({
      page: props.paginationOptions.page || 1,
      size: props.paginationOptions.size || 10
    });

    const paginationOptionsChange = (newPaginationOptions: PaginationOptions) => {
      paginationOptions.value = newPaginationOptions;
    }

    return {
      paginationOptions,
      paginationOptionsChange
    }
  
  }