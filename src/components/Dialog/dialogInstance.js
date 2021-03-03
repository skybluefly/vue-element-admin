import Vue from 'vue'
import { Dialog } from 'element-ui'

Dialog.newInstance = properties => {
  const _props = properties || {}
  const Instance = new Vue({
    name:"c-modal",
    componentName:"CModal",
    data:Object.assign({},{
      show:false,
      component:"",
      data:{},
      isOk:false,
      cptName:"data-form",
      width:"600px",
      footerHide:false,
      okText:"确定",
      canneText:"取消"
    },_props),
    methods: {
      cancelHandler() {
        this.show = false
        this.cancel && this.cancel()
        this.remove()
      },
      okHandler() {
        if(this.beforeCloseModal && typeof this.beforeCloseModal==='function'){
          this.beforeCloseModal(this,this.getInstance(this.$children),this.closeModal)
        }else{
          this.closeModal()
        }
      },
      getInstance(elArray){
        let $component = null;
        elArray.forEach(el=>{
          if(el && el.$options.name===this.cptName){
            $component = el
          }else{
            let component = this.getInstance(el.$children)
            if(component) $component = component
          }
        })
        return $component
      },
      closeModal(){
        this.ok && this.ok()
        this.isOk = true;
        this.show = false;
        this.remove()
      },
      remove() {
        setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy() {
        if(document.body.contains(this.$el)){
          document.body.removeChild(this.$el)
        }
        this.$destroy()
      },
    },
    render(h) {
      return h('el-dialog', {
        props: {
          ..._props,
          visible: this.show
        },

        on: {
          colse:()=>{
            if(this.isOk) return;
            this.cancelHander()
          }

        },
        scopedSlots:{
          default:()=>{
            let modalContent = this.component ? h(this.component,{staticClass:"c-modal-content",props:this.data}) : this.content
            let footer = this.footerHide ? "" : h("div",{staticClass:"el-dialog__footer"},[
              <el-button onClick={this.cancelHandler}>{this.canneText}</el-button>,
              <el-button type="primary" onClick={this.okHandler}>{this.okText}</el-button>

            ])
            return h("div",{staticClass:"c-modal-body"},[modalContent,footer])
          }
        }
      })
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

