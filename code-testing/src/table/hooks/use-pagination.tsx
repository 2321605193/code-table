// 分页器相关

import { computed, Ref, ref  } from '@vue/composition-api'
import { PaginationOptions} from '../types'

export function usePagination (props: Record<string, any>) {
  
    // 分页配置
    let paginationOptions: Ref<PaginationOptions> = ref({
      page: props.paginationOptions.page || 1,
      size: props.paginationOptions.size || 10
    });

    // 通过函数修改数据
    const paginationOptionsChange = (newPaginationOptions: PaginationOptions) => {
      paginationOptions.value = newPaginationOptions;
    }

    // 通过computed获取数据
    const paginationOptionsValue = computed(() => {
      return paginationOptions.value
    })

    return {
      paginationOptionsValue,
      paginationOptionsChange
    }
  
  }