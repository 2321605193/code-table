<template>
  <TestTable :data="getTableData"
             :columns="getTableColumns"
             :showHeader="true"
  >
    <template #name="{value}">
      <span>{{ '自定义表头' + value }}</span>
    </template>
  </TestTable>
</template>

<script lang="ts">
import { TestTable } from '../src/table'
import { computed, defineComponent, h } from '@vue/composition-api'

const data = Array.from({ length: 100 }, (value, index) => {
  return {
    name: 'junjun' + index,
    age: 20 + index,
    love: Math.random().toString().substr(2, index / Math.floor(Math.random()*10)),
  }
})

const columns = [{
//   type: 'selectable',
// }, {
  type: 'index',
},{
  title: '姓名',
  key: 'name',
}, {
  title: '年龄',
  key: 'age',
  sortable: {
    orderBy: ['desc', 'asc'],
    sorter: (curr, next) => curr.age - next.age,
  },
}, {
  title: '爱好',
  key: 'love',
  render: (rowData: Record<string, any>) => {
    return h('span', {}, 'love: ' + rowData.love)
  },
  sortable: {
    orderBy: ['desc', 'asc', 'default'],
    sorter: (curr, next) => curr.love.length - next.love.length,
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

    const getTableColumns = computed(() => {
      return tableColumns
    })

    return { getTableData, getTableColumns }
  },
})
</script>
