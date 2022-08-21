<template>
  <a :title="title" style="margin: 10px">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: 'VueAdminTemplateHintButton',

  data() {
    return {
      
    };
  },

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  mounted() {
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>