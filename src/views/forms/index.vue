<template>
  <SearchForm :model="FormModel" :items="items" />
</template>

<script>
import SearchForm from '../../components/search-form'
export default {
  name: 'FormsIndex',
  components: { SearchForm },
  data() {
    return {
      FormModel: {
        name: 'aaa'
      },
      items: [
        {
          type: 'input',
          prop: 'name'
        }
      ]
    }
  },
  mounted() {
    // console.log(Form)
  }
}
</script>

<style scoped>

</style>
