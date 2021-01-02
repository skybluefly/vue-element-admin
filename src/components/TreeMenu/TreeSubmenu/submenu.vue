
<script>
import Emitter from 'element-ui/src/mixins/emitter'
import menuMixin from '../menu-mixin'
export default {
  name: 'TreeSubmenu',
  mixins: [Emitter, menuMixin],
  componentName: 'TreeSubmenu',
  props: {
    index: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      items: {},
      submenus: {}
    }
  },
  computed: {
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1
    },
    active() {
      let isActive = false
      const submenus = this.submenus

      const items = this.items
      Object.keys(items).forEach(index => {
        if (items[index].active) {
          isActive = true
        }
      })
      Object.keys(submenus).forEach(index => {
        if (submenus[index].active) {
          isActive = true
        }
      })

      return isActive
    },
    composeActive() {
      const bool = this.rootMenu.subActiveIndex.includes(this.index)
      return bool
    }
  },
  mounted() {
    this.parentMenu.addSubmenu(this)
    this.rootMenu.addSubmenu(this)
  },
  beforeDestroy() {
    this.parentMenu.removeSubmenu(this)
    this.rootMenu.removeSubmenu(this)
  },
  methods: {
    handleClick() {
      const { rootMenu, disabled } = this
      this.defaultActive = true
      this.dispatch('TreeMenu', 'submenu-click', this)
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
    }
  },
  render(h) {
    const {
      active,
      opened,
      paddingStyle,
      titleStyle,
      backgroundColor,
      rootMenu,
      currentPlacement,
      menuTransitionName,
      mode,
      disabled,
      popperClass,
      $slots,
      isFirstLevel,
      composeActive
    } = this
    const inlineMenu = (
      <ul
        role='menu'
        class='el-menu el-menu--inline'
        v-show={opened}
      >
        {$slots.default}
      </ul>
    )
    return (
      <li
        class={{
          'el-submenu': true,
          'is-active': composeActive
        }}
      >
        <div
          class='el-submenu__title'
          on-click={this.handleClick}
        >
          {$slots.title}
        </div>
        {inlineMenu}
      </li>
    )
  }
}
</script>

