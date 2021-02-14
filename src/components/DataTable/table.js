import { Table } from 'element-ui'
export default {
  name: 'data-table',
  data() {
    return {
      isRefresh: false,
      loading: false,
      tableData: []
    }
  },
  props: {
    ...Table.props,
    isPagination: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: () => {}
    },
    onLoad: Function
  },
  methods: {
    createTable(h) {
      const props = {}
      Object.keys(Table.props).forEach(name => {
        if (this[name] !== undefined && this[name] !== null) {
          props[name] = this[name]
        }
      })
      return h('el-table', {
        ref: 'dataTable',
        props: {
          ...props,
          data: this.tableData
        },
        staticClass: 'data-table',
        directives: [
          {
            name: 'loading',
            value: this.loading
          }
        ],
        key: this.isRefresh,
        on: {
          ...this.$listeners
        }
      },
      this.columns.map((column, index) => {
        if (typeof column.hide === 'function' && column.hide(column)) return
        return h('el-table-column', {
          props: {
            ...column
          },
          key: index,
          scopedSlots: {
            default: this.renderContent(h, column)
          }
        })
      })
      )
    },
    renderContent(h, column) {
      if (column.render) return props => column.render(h, props)
      switch (column.type) {
        case 'action':
          return props => (column.actionList && column.actionList.map((item, index) => {
            if (!item.hide || (typeof item.hide === 'function') && !item.hide(props.row)) {
              return (<el-button
                key={index}
                onClick={() => item.handleClick.call(this.$parent, props.row)}

              > {item.text || item.diffText(props.row)}</el-button>)
            }
          }))
      }
    },
    createPagination(h) {
      return h('el-row', {
        style: { height: '60px' },
        props: {
          type: 'flex',
          justify: 'end',
          align: 'center'
        }
      }, [h('el-pagination', {
        props: {
          layout: 'total,sizes,prev,pager,next,jumper',
          total: this.page.total,
          'page-sizes': [10, 20, 50, 100],
          'current-page': this.page.currentPage,
          'page-size': this.page.pageSize

        },
        on: {
          ...this.$listeners,
          'current-change': this.pageChange,
          'size-change': this.sizeChange
        }
      })])
    },
    queryData(type) {
      this.loading = true

      if (typeof this.onLoad === 'function') {
        this.onLoad({ page: this.page }, data => {
          this.tableData = data.data
          this.page.currenPage = data.currenPage
          this.page.total = data.total
          this.loading = false
        })
      }
    },
    pageChange(size) {
      this.page.currentPage = size
      this.queryData()
    },
    sizeChange(size) {
      this.page.pageSize = size
      this.queryData()
    }
  },
  created() {
    this.queryData()
  },
  render(h) {
    return h('div', {}, [this.createTable(h), this.createPagination(h)])
  },
  watch: {
    columns() {
      this.isRefresh = !this.isRefresh
    }
  }
}
