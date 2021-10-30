// 排序相关
import { ref, computed, Ref } from '@vue/composition-api'
import { isFunction } from 'lodash-es';
import { SortOptions, SortOrderBy, SortAble } from '../types'





export function useSort() {

  const defaultOrder = [SortOrderBy.desc, SortOrderBy.asc, SortOrderBy.default]


  const sortOptions: Ref<SortOptions> = ref({
    sortRule: (curr: number, next: number) => curr - next,
    sortKey: '',
    activeOrderBy: SortOrderBy.default,
  })

  const oderFlag = computed(() => {
    return sortOptions.value.activeOrderBy === SortOrderBy.desc ? -1 : 1
  })



  const setSortOptions = (sortable: SortAble | boolean, key: string) => {

    const deafultSort = (curr: Record<string, any>, next: Record<string, any>) => curr[key] - next[key]

    // 有自定义排序规则使用自定义，否则使用默认值
    const sortFunction = (sortable.sorter && isFunction(sortable.sorter)) ? sortable.sorter : deafultSort

    // 排序方式
    const order = sortable?.orderBy ? sortable.orderBy : defaultOrder
    //下一个排序规则
    const nextOrderBy = order.indexOf(sortOptions.value.activeOrderBy) === -1 ? SortOrderBy.desc : order[order.indexOf(sortOptions.value.activeOrderBy) + 1]

    sortOptions.value.activeOrderBy =  key === sortOptions.value.sortKey  && nextOrderBy ? nextOrderBy : SortOrderBy.desc
    sortOptions.value.sortRule = sortOptions.value.activeOrderBy === SortOrderBy.default ? null : (curr: Record<string, any>, next: Record<string, any>) => oderFlag.value * sortFunction(curr, next)
    sortOptions.value.sortKey = key

  }

  return {
    sortOptions,
    setSortOptions,
  }

}
