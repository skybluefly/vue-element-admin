import { Form } from 'element-ui'
export default {
  name: 'search-form',
  props: {
    ...Form.prop,
    items: {
      type: Array,
      default() {
        return []
      }
    }

  },
  methods: {
    createFormItem(h, item) {
      const { model, ...otherPorps } = item
      switch (item.type) {
        case 'input':
          return (
            [<el-input
              v-model={model}
              {...otherPorps}
            />,
            item.addition ? item.addition() : null]
          )
      }
    }

  },
  render(h) {
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
        model: this.model,
        inline: this.inline,
        labelWidth: this.labelWidth,
        showMessage: this.showMessage,
        disabled: this.disabled
      }
    }, this.items.map(item => {
      if (item.hide) return // 新增隐藏属性

      return h('el-form-item', {
        props: {
          prop: item.prop,
          label: item.label,
          required: item.required,
          rules: item.rules,
          error: item.error,
          showMessage: item.showMessage || true,
          inlineMessage: item.inlineMessage,
          size: item.size
        }
      }, [this.createFormItem(h, item)])
    }))
  },
  components: {

  },
  updated() {
  }
}
