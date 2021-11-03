import { h, mount } from '@vue/test-utils'
import { TestTable } from '../table'
import SortButton from '../table/sort-button'
import Pagination from '../table/pagination'


const columns = [{
  type: 'index',
},{
  title: '姓名',
  key: 'name',
  sortable: true,
}, {
  title: '',
  key: 'age',
  sortable: {
    orderBy: ['desc', 'asc'],
    sorter: (curr, next) => curr.age - next.age,
  },
}, {
  title: '爱好',
  key: 'love',
  render: rowData => {
    return 'love: ' + rowData.love
  },
}]
const data = Array.from({ length: 3 }, (value, index) => {
  return {
    name: 'junjun' + index,
    age: 20 + index,
    love: Math.random().toString().substr(2, index / Math.floor(Math.random()*10)),
  }
})


describe('Table', () => {
  const TableMount = options => mount(TestTable, options)

  test('render', () => {
    const wrapper = TableMount()
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.vm.$destroy()
    }).not.toThrow()
  })

  test('props paginationLess test', () => {
    const wrapper = TableMount({
      propsData: {
        paginationLess: true,
      },
    })
    expect(wrapper.find('.pagination-content').exists()).toBe(false)
  })

  test('props headerLess test', () => {
    const wrapper = TableMount({
      propsData: {
        headerLess: true,
      },
    })
    expect(wrapper.find('.fj-table-body thead').exists()).toBe(false)
  })


  test('props columns test', () => {
    const wrapper = TableMount({
      propsData: {
        data: data,
        columns: columns,
      },
      slots: {
        name: '自定义表头',
      },
    })
  })


  test('page or size change test', async () => {
    const wrapper = TableMount({
      propsData: {
        data: data,
        columns: columns,
      },
    })

    const vm = wrapper.vm
    expect(wrapper.find('#page').exists()).toBe(true)

    const pageSelect = wrapper.find('#page')
    const sizeSelect = wrapper.find('#size')


    await pageSelect.trigger('change', { value:0 })

    await sizeSelect.trigger('change', { value:0 })

    await pageSelect.trigger('change', {
      value:2,
    })

    await sizeSelect.trigger('change', {
      value:25,
    })
    // pagination.vm.$data.paginationSizeChange({
    //   target: {
    //     value: 25,
    //   },
    // })


    // pagination.vm.$data.paginationPageChange({
    //   target: {
    //     value: 2,
    //   },
    // })

    // expect(vm.$data.paginationOptionsValue.value.page).toBe(2)
    // expect(vm.$data.paginationOptionsValue.value.size).toBe(25)

  })


  test('sort test', async () => {
    const wrapper = TableMount({
      propsData: {
        data: data,
        columns: columns,
      },
    })

    const vm = wrapper.vm
    expect(wrapper.find('.sort-button').exists()).toBe(true)

    const sortButton = wrapper.findComponent(SortButton)

    await sortButton.trigger('click')
    console.log(JSON.stringify(vm.$data.filterTableData) === JSON.stringify(data.sort((curr, next) => (curr.age - next.age))) )

    // expect(wrapper.emittedByOrder().map(e => e.name)).toEqual(['foo', 'bar'])

  })

})
