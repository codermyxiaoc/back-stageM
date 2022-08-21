<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handel1" :disabled="isShowTable">
          <el-option :label="item.name" :value="item.id" v-for="item in CategoryoneList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handel2" :disabled="isShowTable">
          <el-option :label="item.name" :value="item.id" v-for="item in CategorytowList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handel3" :disabled="isShowTable">
          <el-option :label="item.name" :value="item.id" v-for="item in CategorytherrList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateCategory',

  data() {
    return {
      CategoryoneList: [],
      CategorytowList: [],
      CategorytherrList: [],
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  props: {
    isShowTable: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.$API.attr.reqCategoryone().then(res => {
      if(res.code === 200) {
        this.CategoryoneList = res.data
      }
    })
  },
  methods: {
    async handel1() {
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      const result = await this.$API.attr.reqCategorytow(this.cForm.category1Id)
      if(result.code === 200) {
        this.CategorytowList = result.data
      }
      this.$emit('getattrInfo', { id: this.cForm.category1Id, V: 1 })
    },
    async handel2() {
      this.cForm.category3Id = ''
      this.$emit('getattrInfo', { id: this.cForm.category2Id, V: 2 })
      const result = await this.$API.attr.reqCategorytherr(this.cForm.category2Id)
      if (result.code === 200) {
        this.CategorytherrList = result.data
      }
    },
    handel3() {
      this.$emit('getattrInfo', { id: this.cForm.category3Id, V: 3 })
    }
  },
};
</script>

<style lang="scss" scoped>

</style>