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
  sortable: {
    orderBy: ['desc', 'asc'],
    sorter: (curr, next) => curr.love.length - next.love.length,
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

  test('props paginationOptions test', () => {
    const wrapper = TableMount({
      propsData: {
        data: data,
        columns: columns,
        paginationOptions: {
          page: 0,
          size: 0,
        },
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

    expect(wrapper.find('#page').exists()).toBe(true)

    const pageSelect = wrapper.find('#page')
    const sizeSelect = wrapper.find('#size')


    await pageSelect.setValue(0)

    await sizeSelect.setValue(0)

    // await pageSelect.setValue('change', 2)

    // await sizeSelect.setValue('change', 25)
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

    console.log(sortButton.$data)

    await sortButton.trigger('click')
    console.log(JSON.stringify(vm.$data.filterTableData) === JSON.stringify(data.sort((curr, next) => (curr.age - next.age))) )
    await sortButton.trigger('click')
    await sortButton.trigger('click')
    // expect(wrapper.find(`.sort-button__icon--${columns[1].sortable.orderBy[0]}`).exists()).toBe(true)

  })

  test('sort sortable boolean test', async () => {
    const wrapper = TableMount({
      propsData: {
        data: data,
        columns: [{
          title: '爱好',
          key: 'love',
          render: rowData => {
            return 'love: ' + rowData.love
          },
          sortable: {
            orderBy: ['desc', 'asc'],
            sorter: (curr, next) => curr.love.length - next.love.length,
          },
        }],
      },
    })

    expect(wrapper.find('.sort-button').exists()).toBe(true)

    const sortButton = wrapper.findComponent(SortButton)

    console.log(sortButton.$data)

    await sortButton.trigger('click')
    await sortButton.trigger('click')
    await sortButton.trigger('click')
    // expect(wrapper.find(`.sort-button__icon--${columns[1].sortable.orderBy[0]}`).exists()).toBe(true)

  })

})
