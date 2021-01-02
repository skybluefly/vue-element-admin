import { Form, FormItem, Input, Select } from 'element-ui'
import { getNewProps } from '@/utils'
export default {
  name: 'x-form',
  props: {
    formOptions: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }

  },
  data() {
    return {
      defaultKey: {
        label: 'label',
        value: 'value'
      }
    }
  },
  methods: {
    createFormItem(h, item) {
      const { model } = this.formOptions
      const { defaultKey = this.defaultKey, data } = item
      switch (item.types) {
        case 'input':
          return <el-input
            vModel={model[item.prop]}
            {...{ attrs: getNewProps(Input, item), on: item.on }}
            maxlength={item.maxlength}
          />
        case 'select':
          return [<el-select
            vModel={model[item.prop]}
            {...{ attrs: getNewProps(Select, item) }}
          >
            {
              Array.isArray(data) && data.map((item, index) => (
                <s-option key={index} label={item[defaultKey.label]} value={item[defaultKey.value]}/>
              ))
            }
          </el-select>]
      }
    }

  },
  render(h) {
    return h('el-form', {
      staticClass: 'search-form',
      ref: 'form',
      on: {
        ...this.$listeners
      },
      props: {
        ...getNewProps(Form, this.formOptions)
      }
    }, this.options.map(item => {
      if (item.hide) return
      return h('el-form-item', {
        props: {
          ...getNewProps(FormItem, item)
        }
      }, [this.createFormItem(h, item)])
    }))
  },
  components: {

  },
  updated() {
  }
}
