import TreeMenu from './menu'
import './index.scss'

/* istanbul ignore next */
TreeMenu.install = function(Vue) {
  Vue.component(TreeMenu.name, TreeMenu)
}

export default TreeMenu
