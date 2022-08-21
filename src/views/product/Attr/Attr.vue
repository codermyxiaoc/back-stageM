<template>
  <div>
    <el-card style="margin:20px 0px">
      <category-select @getattrInfo="getattrInfo" :isShowTable="!isShowTable"></category-select>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="Addattr">添加属性
        </el-button>
        <el-table :data="attrInfoList" border style="width: 100%;margin:20px 0px">
          <el-table-column type=" index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{row}">
              <el-tag type="success" v-for="item in row.attrValueList" :key="item.id" style="margin:0px 20px">
                {{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="attrValueList" label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataattr(row)"></el-button>
              <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteattr(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form ref="form" :model="attrInfo" label-width="80px">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName">
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="AddattrValue" icon="el-icon-plus" :disabled="!attrInfo.attrName">添加属性值
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width: 100%; margin: 20px 0px" border :data="attrInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <el-input size="mini" v-model="row.valueName" placeholder="请输入输入属性值名称" v-if="row.flag"
                @blur="toLook(row, $index)" @keyup.native.enter="row.flag = false" :ref="$index"></el-input>
              <span v-else @click="toEdit(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`你确定要删除${row.valueName}`" @onConfirm="deleteattrvalue($index)">
                <el-button type="danger" slot="reference" icon="el-icon-delete" circle size="mini"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="AddOrUpdataattr" :disabled="!attrInfo.attrValueList.length >= 1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import CategorySelectmixin from '../../../utils/mixin/CategorySelect'
export default {
  name: 'VueAdminTemplateAttr',
  data() {
    return {
      attrInfoList: [],
      isShowTable: true,
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      },
    }
  },
  components: {

  },
  mounted() {
    
  },
  mixins: [CategorySelectmixin],

  methods: {
    async getdata() {
      console.log(this.category1Id, this.category2Id, this.category3Id);
      const result = await this.$API.attr.reqgetattrInfoList(this.category1Id, this.category2Id, this.category3Id)
      if (result.code === 200) {
        this.attrInfoList = result.data
      }
    },
    AddattrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id ? this.attrInfo.id : undefined,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    deleteattrvalue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    Addattr() {
      this.isShowTable = false
      this.attrInfo.attrName = ''
      this.attrInfo.attrValueList = []
      delete this.attrInfo.id
    },
    updataattr(row) {
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
    },
    toLook(row, index) {
      if (row.valueName.trim() == '') {
        this.deleteattrvalue(index)
        return
      }
      const isRepat = this.attrInfo.attrValueList.some(item => {
        if (item !== row) {
          return item.valueName == row.valueName
        }
      })
      if (isRepat) {
        this.$message('输入重复的属性值')
        return
      }
      return row.flag = false
    },
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    async AddOrUpdataattr() {
      const result = await this.$API.attr.reqAddorUpdataattr(this.attrInfo)
      this.attrInfo.attrValueList.forEach(item => {
        delete item.flag
      })
      if (result.code === 200) {
        this.$message({
          message: this.attrInfo.id ? '修改成功' : '添加成功',
          type: 'success'
        })
        this.getdata()
        this.isShowTable = true
      }
    },
    async deleteattr(row) {
      const result = await this.$API.attr.reqdeleteattr(row.id)
      if(result.code === 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getdata()
      }
      console.log(result);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
