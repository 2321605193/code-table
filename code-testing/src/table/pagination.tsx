

import { defineComponent, reactive, inject, ref, computed, watch,  } from '@vue/composition-api'

export default defineComponent({
  name: 'Pagination',
  setup() {

    let sizeList = reactive([10,25,50,100])
    let { total, getSize, getPage, pageChange, sizeChange, } = inject('tableProvide')
    let paginationSize = ref(getSize.value);
    let paginationPage = ref(getPage.value);


    let pageList = computed(() => {
      return Math.ceil(total.value / paginationSize.value)
    })

    let paginationSizeChange = (e: Event) => {
      paginationSize.value = Number(e.target?.value) || 10;
      
    }

    let paginationPageChange = (e: Event) => {
      paginationPage.value = Number(e.target?.value) || 10;
      
    }

    watch(paginationSize, (newValue) => {
      if (pageList.value < paginationPage.value) {
        paginationPage.value = 1
      }
      sizeChange(newValue)
    })

    watch(paginationPage, (newValue) => {
      pageChange(newValue)
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
            <span> 共{total.value}条 </span>
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

