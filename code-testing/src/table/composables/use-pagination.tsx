// 分页器相关

import { readonly, Ref, ref  } from '@vue/composition-api'
import { PaginationOptions, UsePagination} from '../types'

export function usePagination (props: Record<string, any>): UsePagination {
  
    // 分页配置
    let paginationOptions: Ref<PaginationOptions> = ref({
      page: props.paginationOptions?.page || 1,
      size: props.paginationOptions?.size || 10
    });

    // 通过函数修改数据
    const paginationOptionsChange = (newPaginationOptions: PaginationOptions) => {
      paginationOptions.value = newPaginationOptions;
    }

    // 获取readonly数据
    const paginationOptionsValue = readonly(paginationOptions)

    return {
      paginationOptionsValue,
      paginationOptionsChange
    }
  
  }