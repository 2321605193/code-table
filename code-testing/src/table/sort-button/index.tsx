
import { defineComponent, inject, ref, watch } from '@vue/composition-api'
import ArrowDown from './arrow-down';
import {SortOrderBy} from '../types';




export default defineComponent({
  name: 'SortButton',
  props: {
    sortable: {
      type: Object
    },
    dataKey: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let  { setSortOptions, sortOptions } = inject('tableProvide')
    let activeOrderBy = ref(SortOrderBy.default)

    watch([() => sortOptions.value.sortKey, () => sortOptions.value.activeOrderBy], () => {
      if (sortOptions.value.sortKey !== props.dataKey) {
        activeOrderBy.value = SortOrderBy.default
      } else {
        activeOrderBy.value = sortOptions.value.activeOrderBy
      }
    })

    let sortData = () => {
      setSortOptions(props.sortable, props.dataKey)
    }
    
    return () => {
      return (
          <span onClick={sortData} class={[`sort-button sort-button__icon--${activeOrderBy.value}`]}>
            <i><ArrowDown /></i>
          </span>
      )
    }
  },
})
