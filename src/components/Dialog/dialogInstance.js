import Vue from 'vue'
import { Dialog } from 'element-ui'

Dialog.newInstance = properties => {
  const props = properties || {}
  // 实例化一个组件，然后挂载到body上
  const Instance = new Vue({
    components: { },
    data() {
      return {
        show: false,
        component: '',
        data: {}
      }
    },
    watch: {

      show(newVal) {
        this.visible = newVal
      }

    },
    methods: {
      creatDialogBody(h) {
        const component = h(this.component, { props: this.data }, [])

        return h('div', {}, [component])
      },
      openHandler() {
        this.show = true
        // this.open()
      },
      closeHandler() {
        this.show = false
        // this.close()
        this.remove()
      },
      remove() {
        setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy() {
        this.$destroy()
        document.body.removeChild(this.$el)
      },
      onRemove() {}
    },
    render(h) {
      return h('el-dialog', {
        props: {
          ...props,
          visible: this.show
        },

        on: {
          open: this.openHandler,
          close: this.closeHandler

        }
      }, [this.creatDialogBody(h)])
    }

  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  // 通过闭包维护alert组件的引用
  const modal = Instance
  return {
    show(props) {
      modal.onRemove = props.onRemove
      modal.show = true

      if ('component' in props) {
        modal.component = props.component
      }

      if ('data' in props) {
        modal.data = props.data
      }
      console.log(modal)
      return modal
    },
    remove() {
      modal.show = false
      modal.remove()
    }
  }
}

export default Dialog

