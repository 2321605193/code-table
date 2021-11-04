// 排序相关
import { ref, computed, Ref } from '@vue/composition-api'
import { isFunction } from 'lodash-es';
import { SortOptions, SortOrderBy, SortAble, UserSort } from '../types'





export function useSort(): UserSort {

  // 排序方式  倒序、正序、默认
  const defaultOrder = [SortOrderBy.desc, SortOrderBy.asc, SortOrderBy.default]


  // 排序配置
  const sortOptions: Ref<SortOptions> = ref({
    sortRule: (curr: number, next: number) => curr - next,
    sortKey: '',
    activeOrderBy: SortOrderBy.default,
  })

  const oderFlag = computed(() => {
    return sortOptions.value.activeOrderBy === SortOrderBy.desc ? -1 : 1
  })

  // 修改sort 配置
  const changeSortOptions = (key: string, nextOrderBy: SortOrderBy, sortFunction: Function) => {

    // console.log('changeSortOptions', key, nextOrderBy, sortFunction)
    
    sortOptions.value.activeOrderBy = nextOrderBy
    sortOptions.value.sortRule = sortOptions.value.activeOrderBy === SortOrderBy.default ? null : (curr: Record<string, any>, next: Record<string, any>) => oderFlag.value * sortFunction(curr, next)
    sortOptions.value.sortKey = key
  }


  const setSortOptions = (sortable: SortAble | boolean, key: string) => {

    // console.trace('setSortOptions sortable', sortable)
    // console.trace('setSortOptions key', key)

    // 默认排序规则
    const deafultSort = (curr: Record<string, any>, next: Record<string, any>) => curr[key] - next[key]

    let  sortFunction = deafultSort

    // 有自定义排序规则使用自定义，否则使用默认值
    if (sortable.sorter && isFunction(sortable.sorter)) {
      sortFunction = sortable.sorter
    }

    // 排序方式数组  有传入则使用自定义的，否则使用默认
    const order = sortable.orderBy ||  defaultOrder
    
    // 获取将要排序的方式
    let nextOrderBy = order[order.indexOf(sortOptions.value.activeOrderBy) + 1];
   
    // 若排序方式不是desc/asc/default其中一个或者取值超出数组，设置order第一个排序方式
    if (!nextOrderBy) {
    // console.error(nextOrderBy, '不是desc/asc/default其中一个')
      nextOrderBy = order[0]
    }
    
    changeSortOptions(key, nextOrderBy, sortFunction)

  }

  // 通过computed获取值
  const sortOptionsValue = computed(()=>{
    return sortOptions.value
  })

  return {
    sortOptionsValue,
    setSortOptions,
  }

}