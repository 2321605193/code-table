
import { computed, defineComponent, inject, ref, watch } from '@vue/composition-api'
import { isFunction } from '@vue/shared';
import ArrowDown from './arrow-down';


let defaultOrder = ['desc', 'asc', 'default'];
let defaultOrderBy = 'default'
export default defineComponent({
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
    let  { changeSortRuleAndSortKey, getSortKey } = inject('tableProvide')
    let key = props.dataKey;

    let deafultSort = (curr: Record<string, any>, next: Record<string, any>) => curr[key] - next[key];
    let activeOrderBy = ref(defaultOrderBy)

    watch(() => getSortKey.value, () => {
      if (getSortKey.value !== key) {
        activeOrderBy.value = defaultOrderBy
      }
    })
    

   
    return () => {
      let sortFunction = (props.sortable?.sorter && isFunction(props.sortable?.sorter)) ? props.sortable.sorter : deafultSort
      let order = props.sortable?.orderBy ? props.sortable.orderBy : defaultOrder
    
      let oderFlag = computed(() => {
        return activeOrderBy.value === 'desc' ? -1 : 1
      })

      let sortData = () => {
        let nextOrderBy = order.indexOf(activeOrderBy.value) === -1 ? defaultOrder[0] : order[order.indexOf(activeOrderBy.value) + 1]
        activeOrderBy.value =  nextOrderBy ? nextOrderBy : defaultOrder[0]
        let sortRule = activeOrderBy.value === defaultOrderBy ? null : (curr: Record<string, any>, next: Record<string, any>) => oderFlag.value * sortFunction(curr, next);
        changeSortRuleAndSortKey(sortRule, key)
      }

      
      return (
          <span onClick={changeSortRuleAndSortKey(sortable, key)} class={[`sort-button sort-button__icon--${activeOrderBy.value}`]}>
            <i><ArrowDown /></i>
          </span>
      )
    }
  },
})
