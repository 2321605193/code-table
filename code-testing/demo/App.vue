<template>
  <TestTable :tableData="tableData" :column="tableColumns">
    <template #name="{value}">
      <span>{{ value }}</span>
    </template>
  </TestTable>
</template>

<script lang="ts">
import { TestTable } from '../src/table'
import { defineComponent, h, reactive } from '@vue/composition-api'

const data = Array.from({ length:25 }, (value, index) => {
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
    const tableData = reactive(data)
    const tableColumns = reactive(columns)

    return { tableData, tableColumns }
  },
})
</script>
