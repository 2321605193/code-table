

import { defineComponent, reactive, inject, ref, computed, watch, watchEffect,  } from '@vue/composition-api'

export default defineComponent({
  name: 'Pagination',
  setup() {

    // 分页器  随便写写...

    let sizeList = reactive([10,25,50,100])
    let { props, paginationOptionsChange, paginationOptionsValue } = inject('tableProvide')
    let paginationSize = ref(paginationOptionsValue.value.size);
    let paginationPage = ref(paginationOptionsValue.value.page);


    let pageList = computed(() => {
      return Math.ceil(props.data.length / paginationSize.value)
    })

    let paginationSizeChange = (e: Event) => {
      paginationSize.value = Number(e.target?.value || 10);
      
    }

    let paginationPageChange = (e: Event) => {
      paginationPage.value = Number(e.target?.value || 1);
    }

    watchEffect(()=>{

      if (pageList.value < paginationPage.value) {
        paginationPage.value = 1
      }
      
      // paginationOptionsValue.value.page = 1
      // debugger
      paginationOptionsChange({
        size: paginationSize.value,
        page: paginationPage.value
      })
    })

    return () => {
      let sizeSelectOptions = sizeList.map((item) => {
        return (<option value={item}>{item}</option>);
      })

      let pageSelectOptions = []
      for (let index = 1; index <= pageList.value; index++) {

        pageSelectOptions.push(
          (<option value = {index}> {index} </option>)
        )
        
      }
      
      return (
        <section class='pagination-content'>
          <div>
            <span> 共{props.data.length}条 </span>
          </div>
          <div>
            <span>第</span>
            <select name="pageSelect" id="page" onChange={paginationPageChange}>
              {pageSelectOptions}
            </select>
            <span>页</span>
          </div>

          <div>
            <span>每页</span>
            <select  name="sizeSelect" id="size" onChange={paginationSizeChange}>
              {sizeSelectOptions}
            </select>
            <span>条</span>
          </div>
          

        </section>
      )
    }
  },


})

