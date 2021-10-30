import { h, mount } from '@vue/test-utils'
import { TestTable } from '../table'
import SortButton from '../table/sort-button'

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
        headerLess: false,
      },
    })
    expect(wrapper.find('.fj-table-body thead').exists()).toBe(true)
  })


  test('props columns test', async () => {
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
        orderBy: ['desc', 'asc', 'default'],
        sorter: (curr, next) => curr.love.length - next.love.length,
      },
    }]
    const data = Array.from({ length: 100 }, (value, index) => {
      return {
        name: 'junjun' + index,
        age: 20 + index,
        love: Math.random().toString().substr(2, index / Math.floor(Math.random()*10)),
      }
    })
    const wrapper = TableMount({
      propsData: {
        data: data,
        columns: columns,
      },
      slots: {
        name: '自定义表头',
      },
    })

    expect(wrapper.find('.sort-button').exists()).toBe(true)


    // const sortButton = wrapper.findComponent(SortButton)
    // await sortButton.trigger('click')




  })

})
