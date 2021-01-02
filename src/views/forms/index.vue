<template>
  <div>
    <x-form
      :form-options="formOptions"
      :options="options"
    />
    <!--    <Dialog v-model="dialog" title="拉拉" :modal="modal" @close="test">-->
    <!--      <span slot="title">2222222</span>-->
    <!--      222-->
    <!--      <span slot="footer">-->
    <!--        <el-button @click="dialog = false">取 消</el-button>-->
    <!--        <el-button type="primary" @click="dialog = false">确 定</el-button>-->
    <!--      </span>-->
    <!--    </Dialog>-->
    <el-button @click="click">点击弹窗</el-button>
  </div>
</template>

<script>
import XForm from '@/components/search-form'
// import Dialog from '@/components/Dialog/modal.vue'
import Test from './test.vue'
export default {
  name: 'FormsIndex',
  components: { XForm },
  data() {
    return {
      dialog: false,
      modal: true,
      formOptions: {
        model: {
          name: 'text'
        }
      },
      options: [
        { types: 'input', label: '姓名', prop: 'name', clearable: true }
      ]
    }
  },
  mounted() {
  },
  methods: {
    click() {
      console.log(Test)
      this.$CDialog.open({
        title: '测试',
        width: '30%',
        component: Test,
        data: {
          test: '1111'
        }
      })
    },
    test() {
      console.log(1)
    }
  }
}
</script>

<style scoped>

</style>
