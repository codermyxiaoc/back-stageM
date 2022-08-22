<template>
  <div>
    <el-card style="margin: 20px 0px">
      <category-select @getattrInfo="getattrInfo" :isShowTable="scene != 0"></category-select>
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addspu">添加SPU</el-button>
        <el-table style="width: 100%; margin: 20px 0px" border :data="productList">
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="spuName" label="spu名称"></el-table-column>
          <el-table-column align="center" prop="description" label="spu描述"></el-table-column>
          <el-table-column align="center" prop="prop" label="操作">
            <template slot-scope="{row}">
              <hint-button type="success" icon="el-icon-plus" size="mini" @click="addsku(row)" title="添加sku">
              </hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updataspu(row)">
              </hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" @click="looksku(row)" title="查看当前spu的所有sku">
              </hint-button>
              <el-popconfirm :title="`你确定要删除${row.spuName}`" @onConfirm="deletespu(row)">
                <hint-button type="danger" slot="reference" icon="el-icon-delete" size="mini" title="删除spu">
                </hint-button>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" @prev-click="handleCurrentChange" @next-click="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
      <spu-from v-show="scene === 1" @goScene="goScene" ref="spu"></spu-from>
      <sku-from v-show="scene === 2" @goScene="goScene" ref="sku"></sku-from>
    </el-card>
    <el-dialog :title="`${currentrow.spuName}的sku列表`" :visible.sync="dialogTableVisible" width="70%" @close="close">
      <el-table :data="skuList" v-loading="loading">
        <el-table-column property="skuName" label="名称"></el-table-column>
        <el-table-column property="price" label="价格"></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column property="address" label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="height: 100px;width: 100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import CategorySelectmixin from '../../../utils/mixin/CategorySelect' 
import SpuFrom from './childercomps/SpuFrom.vue'
import SkuFrom from './childercomps/SkuFrom.vue'
export default {
  name: 'VueAdminTemplateSpu',

  data() {
    return {
      page: 1,
      limit: 6,
      productList: [],
      total: 0,
      scene: 0,
      dialogTableVisible: false,
      currentrow: {},
      skuList: [],
      loading: true
    }
  },
  mixins: [CategorySelectmixin],

  components: {
    SpuFrom,
    SkuFrom,
  },
  mounted() {
   
  },
  methods: {
    async getdata() {
      const result = await this.$API.spu.reqproductList(this.page, this.limit, this.category3Id)
      if(result.code === 200) {
        this.productList = result.data.records
        this.total = result.data.total
      }
    },
    handleCurrentChange(page) {
    this.page = page
    this.getdata()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getdata()
    },
    addspu() {
      this.scene = 1
      this.$refs.spu.addspudata(this.category3Id)
    },
    updataspu(row) {
      this.$refs.spu.getdata(row)
      this.scene = 1
    },
    goScene(dot,flag) {
      if (flag) {
        this.page = 1
        this.scene = dot
      } else {
        this.scene = dot
      }
      
      this.getdata()
    },
    async deletespu(row) {
       const result = await this.$API.spu.reqdeletespu(row.id)
      if(result.code = 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
      this.getdata()
    },
    addsku(row) {
      this.scene = 2
      const idlist = {
        category1Id: this.category1Id, 
        category2Id: this.category2Id, 
        category3Id: this.category3Id
      } 
      this.$refs.sku.getdata(row,idlist)
    },
    async looksku(row) {
      this.dialogTableVisible = true
      this.currentrow = row
      const result = await this.$API.sku.reqfindBySpuId(row.id)
      if(result.code === 200) {
        this.skuList = result.data
        this.loading = false
      }
    },
    close() {
      this.loading = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
