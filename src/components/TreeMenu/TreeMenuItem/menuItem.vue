
<template>
  <li
    class="el-menu-item"
    role="menuitem"
    tabindex="-1"
    :class="{
      'is-active': active,
    }"
    @click="handleClick"
  >
    <slot />
    <slot name="title" />
  </li>
</template>
<script>
import Emitter from 'element-ui/src/mixins/emitter'
import menuMixin from '../menu-mixin'
export default {
  name: 'TreeMenuItem',
  componentName: 'TreeMenuItem',
  mixins: [Emitter, menuMixin],
  props: {
    index: [String, Number]
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex
    }
  },
  mounted() {
    this.parentMenu.addItem(this)
    this.rootMenu.addItem(this)
  },
  beforeDestroy() {
    this.parentMenu.removeItem(this)
    this.rootMenu.removeItem(this)
  },
  methods: {
    handleClick() {
      this.dispatch('TreeMenu', 'item-click', this)
      this.$emit('click', this)
    }
  }

}
</script>

