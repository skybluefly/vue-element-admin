import Vue from 'vue'
import { Dialog } from 'element-ui'

Dialog.newInstance = properties => {
  const _props = properties || {}
  // 实例化一个组件，然后挂载到body上
  const Instance = new Vue({
    components: { },
    data() {
      return {
        show: false,
        component: '',
        data: {},
        isOk: false
      }
    },

    methods: {

      okHandler() {
        if (typeof _props.beforCloseDialog === 'function') {
          _props.beforCloseDialog(this, this.getFormInstance(this.$children), this.closeDialog)
        } else {
          this.closeDialog()
        }
      },
      closeDialog() {
        _props.ok && _props.ok()
        this.isOk = true
        this.show = false
        this.remove()
      },
      closeHandler() {
        this.show = false
        _props.cannel && _props.cannel()
        this.remove()
      },
      getFormInstance(elementArr) {
        let $form = null
        elementArr.forEach(element => {
          if (element && element.$options.name === 'data-form') {
            $form = element
          } else {
            const form = this.getFormInstance(element.$children)
            if (form) $form = form
          }
        })
        return $form
      },
      remove() {
        setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy() {
        if (document.body.contains(this.$el)) {
          document.body.removeChild(this.$el)
        }
        this.$destroy()
      },
      onRemove() {}
    },
    render(h) {
      return h('el-dialog', {
        staticClass: 'x-dialog',
        props: {
          ..._props,
          visible: this.show
        },

        on: {
          close: () => {
            if (this.isOk) return
            this.closeHandler()
          }

        },
        scopedSlots: {
          default: () => {
            let dialogContent = ''
            if (_props.content) {
              dialogContent = _props.content
            } else if (_props.component) {
              dialogContent = h(this.component, { staticClass: 'x-dialog-content', props: this.data }, [])
            }
            const footer = _props.footerHide ? '' : h('div', { staticClass: 'el-dialog__footer' }, [
              <el-button onClick={this.closeHandler}>取消</el-button>,
              <el-button type='primary' onClick={this.okHandler}>取消</el-button>
            ])
            return h('div', { staticClass: 'c-dialog-body' }, [dialogContent, footer])
          }
        }
      }, [])
    }

  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  // 通过闭包维护alert组件的引用
  const dialog = Instance
  return {
    show(props) {
      dialog.onRemove = props.onRemove
      dialog.show = true

      if ('component' in props) {
        dialog.component = props.component
      }

      if ('data' in props) {
        dialog.data = props.data
      }
      console.log(dialog)
      return dialog
    },
    remove() {
      dialog.show = false
      dialog.remove()
    },
    component: dialog
  }
}

export default Dialog

