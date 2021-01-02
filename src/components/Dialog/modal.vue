<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    :modal="modal"
    :width="width"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    @open="open"
    @close="close"
  >
    <template v-if="$slots.title">
      <span slot="title">
        <slot name="title" />
      </span>
    </template>
    <slot />
    <span slot="footer" class="dialog-footer">
      <slot name="footer" />
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'Modal',
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    width: String,
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    value(newVal) {
      this.show = newVal
    },
    show(newVal) {
      this.$emit('input', newVal)
    }
  },
  created() {
  },
  methods: {
    open() {
      this.value = true
      this.$emit('open')
    },
    close() {
      this.value = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
