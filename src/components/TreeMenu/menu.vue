
<script>
import Emitter from 'element-ui/src/mixins/emitter'
import Migrating from 'element-ui/src/mixins/migrating'
export default {
  name: 'TreeMenu',
  componentName: 'TreeMenu',
  mixins: [Emitter, Migrating],
  props: {
    defaultActive: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      items: {},
      submenus: {},
      openedMenus: [],
      subActiveIndex: []
    }
  },

  provide() {
    return {
      rootMenu: this
    }
  },
  watch: {
    defaultActive(value) {
      if (!this.items[value]) {
        this.activeIndex = null
      }
      this.updateActiveIndex(value)
    }
  },
  mounted() {
    this.$on('submenu-click', this.handleSubmenuClick)
    this.$on('item-click', this.handleItemClick)
    this.$watch('items', this.updateActiveIndex)
  },
  methods: {
    updateActiveIndex(val) {
      const item = this.items[val] || this.items[this.activeIndex] || this.items[this.defaultActive]
      if (item) {
        this.activeIndex = item.index
      } else {
        this.activeIndex = null
      }
    },
    addItem(item) {
      this.$set(this.items, item.index, item)
    },
    removeItem(item) {
      delete this.items[item.index]
    },
    addSubmenu(item) {
      this.$set(this.submenus, item.index, item)
    },
    removeSubmenu(item) {
      delete this.submenus[item.index]
    },
    handleSubmenuClick(submenu) {
      const { index, indexPath } = submenu
      this.subActiveIndex = indexPath
      const isOpened = this.openedMenus.indexOf(index) !== -1
      this.activeIndex = ''
      if (isOpened) {
        this.closeMenu(index)
        this.$emit('close', index, indexPath)
      } else {
        this.openMenu(index, indexPath)
        this.$emit('open', index, indexPath)
      }
    },
    closeMenu(index) {
      const i = this.openedMenus.indexOf(index)
      if (i !== -1) {
        this.openedMenus.splice(i, 1)
      }
    },
    openMenu(index, indexPath) {
      const openedMenus = this.openedMenus
      if (openedMenus.indexOf(index) !== -1) return
      // 将不在该菜单路径下的其余菜单收起
      // collapse all menu that are not under current menu item
      if (this.uniqueOpened) {
        this.openedMenus = openedMenus.filter(index => {
          return indexPath.indexOf(index) !== -1
        })
      }
      this.openedMenus.push(index)
    },
    handleItemClick(item) {
      const { index, indexPath } = item
      const hasIndex = item.index !== null

      if (hasIndex) {
        this.activeIndex = item.index
      }
      this.$emit('select', index, indexPath, item)
    }

  },
  render() {
    const component = (
      <ul
        role='menubar'
        className={{
          'tree-menu': true
        }}
      >
        { this.$slots.default }
      </ul>
    )

    return component
  }
}
</script>

