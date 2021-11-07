import { ComputedRef, InjectionKey } from '@vue/composition-api'
import { PaginationOptionsChange, PaginationOptionsValue, SetSortOptions, SortOptionsValue, TableData } from './types'

interface TableProvide  {
    props: Record<string, unknown>
    slots: Record<string, unknown>
    filterTableData: ComputedRef<TableData>
    paginationOptionsChange: PaginationOptionsChange
    paginationOptionsValue: PaginationOptionsValue
    setSortOptions: SetSortOptions
    sortOptionsValue: SortOptionsValue
}

export const TABLE_PROVIDE: InjectionKey<TableProvide> = Symbol('Table Provide')
