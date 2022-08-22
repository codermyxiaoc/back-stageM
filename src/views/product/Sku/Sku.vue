<template>
  <div>
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column type="index" label="序号" width="width"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column prop="prop" label="默认图片" width="width">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" alt="" style="height: 100px; width: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="总量(KG)" width="width"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="width"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="success" icon="el-icon-top" size="mini" @click="onSale(row) " v-if="row.isSale === 0">
          </el-button>
          <el-button type="info" icon="el-icon-bottom" size="mini" @click="cancelSale(row)" v-else></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="$message('正在开发中...')"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="SkuById(row)"></el-button>
          <el-popconfirm :title="`确定要删除${row.skuName}sku吗`" @onConfirm="deletesku(row)">
            <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini"></el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: center" :current-page="page" :page-sizes="[5, 10, 15]" :page-size="limit"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper , ->, sizes,total"
      :total="total">
    </el-pagination>
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" style="margin: 0px 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{
              item.attrId }}-{{item.valueId}}
            </el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">图片展示</el-col>
        <el-col :span="16">
          <el-carousel height="300px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateSku',

  data() {
    return {
      page: 1,
      limit: 6,
      total: 0,
      skuList: [],
      skuInfo: {},
      drawer: false
    }
  },

  mounted() {
    this.getdata()
  },

  methods: {
    handleSizeChange(limit) {
      this.limit = limit
      this.getdata()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getdata()
    },
    async getdata(){
      const  result = await this.$API.sku.reqproductlist(this.page,this.limit)
      if(result.code = 200) {
        this.skuList = result.data.records
        this.page = result.data.current
        this.limit = result.data.size
        this.total = result.data.total
      }
    },
    async onSale(row) {
      const result = await this.$API.sku.reqonSale(row.id)
      if(result.code === 200) {
        this.$message({
          type: 'success',
          message: '下架成功'
        })
        this.getdata()
      }
    },
    async cancelSale(row) {
      const result = await this.$API.sku.reqcancelSale(row.id)
      if(result.code = 200) {
        this.$message({
          type: 'success',
          message: '上架成功'
        })
      }
      this.getdata()
    },
    async SkuById(row) {
      const result = await this.$API.sku.reqSkuById(row.id)
      if(result.code === 200){
        this.skuInfo = result.data
        this.drawer = true
      }
    },
    async deletesku(row) {
      const result = await this.$API.sku.reqdeleteSku(row.id)
      if(result.code === 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getdata()
      }
    }
  }
}
</script>

<style lang="css" scoped>
.el-col{
  margin: 10px;
}
.el-col-5 {
  text-align: right;
  font-weight: 700;
  font-size: 17px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
