
import { defineComponent, inject, ref, watch } from '@vue/composition-api'
import ArrowDown from './arrow-down';
import {SortOrderBy} from '../types';




export default defineComponent({
  name: 'SortButton',
  props: {
    sortable: {
      type: [Object, Boolean],
      default: false
    },
    dataKey: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let  { setSortOptions, sortOptionsValue } = inject('tableProvide')
    let activeOrderBy = ref(SortOrderBy.default)

    watch([() => sortOptionsValue.value.sortKey, () => sortOptionsValue.value.activeOrderBy], () => {
      
      // 不是当前key置为默认
      if (sortOptionsValue.value.sortKey !== props.dataKey) {
        activeOrderBy.value = SortOrderBy.default
      } else {
        activeOrderBy.value = sortOptionsValue.value.activeOrderBy
      }
    })

    // 切换排序规则
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
