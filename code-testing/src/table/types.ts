/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { ComputedRef, DeepReadonly, Ref } from '@vue/composition-api'


// Props 定义在这里
export const tableProps = {
  data: {
    type: Array,
    default: (): Record<string, any>[] => ([]),
  },
  columns: {
    type: Array,
    default: (): Record<string, any>[] => ([]),
  },
  paginationLess: {
    type: Boolean,
    default: false,
  },

  headerLess: {
    type: Boolean,
    default: false,
  },

  paginationOptions: {
    type: Object,
    default: (): PaginationOptions => ({
      page: 1,
      size: 10,
    }),
  },
}

// 表格相关TS
export type TableData = Record<string, any>[];
export enum ColumnsType {
  index = 'index'
}

export type Columns = {
  type?: ColumnsType
  title: string
  key: string
  render?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  sortable?: SortAble | Boolean
}


export type UserDataSource = {
  filterTableData: ComputedRef<TableData>
}

// 排序相关ts
export enum SortOrderBy {
  default = 'default',
  desc = 'desc',
  asc = 'asc'
}

export type SortOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  sortRule: Function | null
  sortKey: string
  activeOrderBy: SortOrderBy
}

export type SortAble = {
  orderBy?: SortOrderBy[]
  // eslint-disable-next-line @typescript-eslint/ban-types
  sorter?: Function
}

export type SetSortOptions = (sortable: SortAble | boolean, key: string) => void
export type SortOptionsValue = DeepReadonly<Ref<SortOptions>>
export type UserSort = {
  sortOptionsValue: SortOptionsValue
  setSortOptions: SetSortOptions
}

// 分页相关
export type PaginationOptions = {
  page: number
  size: number
}

export type PaginationOptionsChange = (v: PaginationOptions) => void
export type PaginationOptionsValue = DeepReadonly<Ref<PaginationOptions>>
export type UsePagination = {
  paginationOptionsValue: PaginationOptionsValue
  paginationOptionsChange: PaginationOptionsChange
}


