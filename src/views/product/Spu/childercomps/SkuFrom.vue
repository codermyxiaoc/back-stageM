<template>
  <div>
    <el-form ref="form" label-width="80px" :data="skuInfo">
      <el-form-item label="SPU名称">
        {{ row.spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" v-model="skuInfo.skuDesc" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="from" label-width="80px">
          <el-form-item :label="item.attrName" v-for="item in attrInfoList" :key="item.id">
            <el-select placeholder="请选择" v-model="item.idorvalue">
              <el-option :label="items.valueName" :value="`${item.id}:${items.id}`" v-for="items in item.attrValueList"
                :key="items.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="from" label-width="80px">
          <el-form-item :label="item.saleAttrName" v-for="item in attrList" :key="item.id">
            <el-select placeholder="请选择" v-model="item.idorvalue">
              <el-option :label="items.saleAttrValueName" :value="`${item.id}:${items.id}`"
                v-for="items in item.spuSaleAttrValueList" :key="items.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="imgList" @selection-change="handleSelectionChange">
          <el-table-column prop="prop" type="selection" width="80"></el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" alt="" style="height: 100px; width: 100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button v-if="row.isDefault === 0" type="primary" size="mini" @click="changeindex(row)">设为默认
              </el-button>
              <el-tag v-else type="success">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addsku">保存</el-button>
        <el-button @click="exitsku">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { assertIfStatement } from '@babel/types';

export default {
  name: 'VueAdminTemplateSkuFrom',

  data() {
    return {
      row: {},
      imgList: [],
      skuImageList: [],
      attrList: [],
      attrInfoList: [],
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        price: 0,
        weight: '',
        skuName: '',
        skuDefaultImg: '',
        skuDesc: '',
        skuAttrValueList: [
        ],
        skuImageList: [
        ],
        skuSaleAttrValueList: [
        ],
      }
    };
  },

  mounted() {
    
  },

  methods: {
    exitsku() {
      this.$emit('goScene',0,false)
    },
    async getdata(row,idlist) {
      Object.assign(this._data, this.$options.data())
      const { category1Id, category2Id, category3Id } = idlist
      this.row = row
      this.skuInfo.category3Id = category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId

      const imglist = await this.$API.sku.reqsupingList(row.id)
      if (imglist.code === 200) {
        let list = imglist.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.imgList = list
      }
      const attrlist = await this.$API.sku.reqSaleAttrList(row.id)
      if(attrlist.code === 200) {
        this.attrList = attrlist.data
      }
      const attrInfoList = await this.$API.sku.reqattrInfoList(category1Id, category2Id, category3Id)
      if(attrInfoList.code === 200) {
        this.attrInfoList = attrInfoList.data
      }
    },
    changeindex(row) {
      this.imgList.forEach(item => {
        item.isDefault = 0
      })
      this.skuInfo.skuDefaultImg = row.imgUrl
      row.isDefault = 1
    },
    handleSelectionChange(value) {
      this.skuImageList = value
    },
    async addsku() {
      this.attrInfoList.forEach(item => {
        if (item.idorvalue) {
          const [attrId, valueId] = item.idorvalue.split(':')
          this.skuInfo.skuAttrValueList.push({ attrId, valueId })
        }
      })
      this.attrList.forEach(item => {
        if (item.idorvalue) {
          const [saleAttrId, saleAttrValueId] = item.idorvalue.split(':')
          this.skuInfo.skuSaleAttrValueList.push({ saleAttrId, saleAttrValueId })
        } 
      })
      this.skuInfo.skuImageList = this.skuImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      const result = await this.$API.sku.reqAddSkuInfo(this.skuInfo)
      if(result.code === 200) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$emit('goScene', 0, false)
      }
    }
  },
 
};
</script>

<style lang="css" scoped>

</style>