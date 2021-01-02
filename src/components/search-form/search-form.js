import { Form } from 'element-ui'
export default {
  name: 'search-form',
  props: {
    ...Form.prop,
    model: Object,
    items: {
      type: Array,
      default() {
        return []
      }
    }

  },
  methods: {
    createFormItem(h, item) {
      const { type, prop, addition, ...otherPorps } = item
      switch (type) {
        case 'input':
          return (
            [<el-input
              v-model={this.model[prop]}
              {...otherPorps}
            />,
            addition ? item.addition() : null]
          )
      }
    }

  },
  render(h) {
    const props = {}
    Object.keys(Form.props).forEach(name => {
      if (this[name] !== undefined && this[name] !== null) {
        props[name] = this[name]
      }
    })
    return h('el-form', {
      staticClass: 'search-form',
      ref: 'form',
      directives: [
        {
          name: 'loading',
          value: this.loading
        }
      ],
      attrs: {
        'element-loading-text': '拼命加载中...'
      },
      on: {
        ...this.$listeners
      },
      props: {
        ...props
      }
    }, this.items.map(item => {
      const { hide, ...otherProps } = item
      if (hide) return // 新增隐藏属性

      return h('el-form-item', {
        props: {
          ...otherProps
        }
      }, [this.createFormItem(h, item)])
    }))
  },
  components: {

  },
  updated() {
  }
}
