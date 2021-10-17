<template>
  <TestTable :data="getTableData" :columns="getTableColums" :showIndex="true">
    <!-- <template #name="{value}">
      <span>{{ value }}</span>
    </template> -->
  </TestTable>
</template>

<script lang="ts">
import { TestTable } from '../src/table'
import { computed, defineComponent, h, reactive } from '@vue/composition-api'

const data = Array.from({ length: 100 }, (value, index) => {
  return {
    name: 'junjun' + index,
    age: 20 + index,
    love: Math.random().toString().substr(2,4),
  }
})

const columns = [{
  title: '姓名',
  key: 'name',
}, {
  title: '年龄',
  key: 'age',
  sortable: true,
}, {
  title: '爱好',
  key: 'love',
  rander: (rowData: Record<string, any>) => {
    return h('span', { color: '#00f' }, rowData.love)
  },
}]


export default defineComponent({
  name: 'App',
  components: {
    TestTable,
  },
  setup() {
    const tableData = data
    const tableColumns = columns

    const getTableData = computed(()=>{
      return tableData
    })

    const getTableColums = computed(() => {
      return tableColumns
    })

    return { getTableData, getTableColums }
  },
})
</script>
