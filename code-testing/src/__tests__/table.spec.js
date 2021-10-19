import { h, mount } from '@vue/test-utils'
import { TestTable } from '../table'

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

  test('props showPagination test', () => {
    const wrapper = TableMount({
      propsData: {
        showPagination: true,
      },
    })
    expect(wrapper.find('.pagination-content').exists()).toBe(true)
  })

  test('props showHeader test', () => {
    const wrapper = TableMount({
      propsData: {
        showHeader: false,
      },
    })
    expect(wrapper.find('.fj-table__header').exists()).toBe(false)
  })


  test('props columns test', () => {
    const columns = [{
      title: '姓名',
      key: 'name',
    }, {
      title: '年龄',
      key: 'age',
      sortable: {
        orderBy: ['desc', 'asc'],
        sorter: (curr, next) => curr.age - next.age
      },
    }, {
      title: '爱好',
      key: 'love',
      render: (rowData) => {
        return 'love: ' + rowData.love
      },
      sortable: {
        orderBy: ['desc', 'asc', 'default'],
        sorter: (curr, next) => curr.love.length - next.love.length
      }
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
        showHeader: true,
        showIndex: true,
        showPagination: true
      },
    })

    expect(wrapper.find('.sort-button').exists()).toBe(true)
  })

})
