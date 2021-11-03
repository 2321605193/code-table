/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropOptions, PropType } from 'vue-types/dist/types'
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>
type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never
}[keyof T]

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>
type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
    ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    : T extends ObjectConstructor | { type: ObjectConstructor }
      ? Record<string, any>
      : T extends BooleanConstructor | { type: BooleanConstructor }
        ? boolean
        : T extends Prop<infer V, infer D>
          ? unknown extends V
            ? D
            : V
          : T

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxPublicPropTypes<O> = O extends object
  ? { [K in PublicRequiredKeys<O>]: InferPropType<O[K]> } & { [K in PublicOptionalKeys<O>]?: InferPropType<O[K]> }
  : { [K in string]: any }



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

export type TablePublicProps = IxPublicPropTypes<typeof tableProps>


export type TableData = Record<string, any>[];

export type PaginationOptions = {
  page: number
  size: number
}

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


