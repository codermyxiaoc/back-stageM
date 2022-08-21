<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="item.tmName" :value="item.id" v-for="item in tradeMarkList" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input placeholder="SPU描述" type="textarea" :rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload action="/goods-api/admin/product/fileUpload" :file-list="imageList" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handlesuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelect.length}未选择`" v-model="attrId">
          <el-option :value="{ baseSaleAttrId: item.id, saleAttrName: item.name}" :label="item.name"
            v-for="item in unSelect" :key="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId" @click="Addattr">添加销售属性</el-button>
        <el-table style="width: 100%;margin: 10px 0px" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150"></el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable :disable-transitions="false"
                @close="handleClose(row, $index)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
                @blur="handleInputConfirm(row)" size="small">
              </el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addattrvalue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteattr(row, $index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addorupdata">保存</el-button>
        <el-button @click="$emit('goScene',0,false)">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateSpuFrom',

  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        category3Id: 0,
        tmId: '',
        description: '',
        spuName: '',
        spuImageList: [
          {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: '',
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: '',
                saleAttrName: '',
                saleAttrValueName: '',
                spuId: {}
              }
            ]
          }
        ],
      },
      tradeMarkList: [],
      imageList: [],
      baseList: [],
      attrId: null,
      spuImageList: []
    };
  },

  mounted() {
    
  },

  methods: {
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess(response, file, fileList) {
      this.spuImageList = fileList
    }, 
    Addattr() {
      this.attrId.spuSaleAttrValueList = []
      this.spu.spuSaleAttrList.push(this.attrId)
      this.attrId = null
    },
    async getdata(row) {
      const spuresult = await this.$API.spu.reqgetSpuById(row.id)
      if(spuresult.code === 200) {
        this.spu = spuresult.data
      }
      const tradeMarkList = await this.$API.spu.reqspuTrademarkList()
      if (tradeMarkList.code === 200) {
        this.tradeMarkList = tradeMarkList.data
      }
      const imageList = await this.$API.spu.reqspuImageList(row.id)
      if(imageList.code === 200) {
        imageList.data.forEach(element => {
          element.name = element.imgName
          element.url= element.imgUrl
        });
        this.imageList = imageList.data
        this.spuImageList = imageList.data
        
      }
      const baseList = await this.$API.spu.reqbaseSaleAttrList()
      if (baseList.code === 200) {
        this.baseList = baseList.data
      }
    },
     handleClose(row,index) {
       row.spuSaleAttrValueList.splice(index-1,1)
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(row) {
      let flag = false
      row.spuSaleAttrValueList.forEach(item => {
        if (item.saleAttrValueName === row.inputValue) {
          flag = true
          return
        }
      })
      if (row.inputValue.trim() === '') {
        flag = true
      }
      if(flag) {
        this.$message('属性值重复')
        return
      }
      row.spuSaleAttrValueList.push({ saleAttrValueName: row.inputValue, baseSaleAttrId: row.baseSaleAttrId })
      row.inputVisible = false;
      row.inputValue = '';
    },
    addattrvalue(row) {
      this.$set(row,'inputVisible',true)
      this.$set(row, 'inputValue', '')
    },
    deleteattr(row,index) {
      this.spu.spuSaleAttrList.splice(index,1)
    },
    async addorupdata() {
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
        imgName: item.name,
        imgUrl: (item.response && item.response.data) || item.url
        }
      })
      const result =  await this.$API.spu.reqAddOrUpdataAttrInfo(this.spu)
      if(result.code === 200) {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        if(this.spu.id) {
          this.$emit('goScene',0,false)
        } else {
          this.$emit('goScene', 0, true)
        }
        
      }
    },
    async addspudata(category3Id) {
      Object.assign(this._data,this.$options.data())
      delete this.spu.id
      this.spu.category3Id = category3Id
      const tradeMarkList = await this.$API.spu.reqspuTrademarkList()
      console.log(tradeMarkList);
      if (tradeMarkList.code === 200) {
        this.tradeMarkList = tradeMarkList.data
      }
      const baseList = await this.$API.spu.reqbaseSaleAttrList()
      if (baseList.code === 200) {
        this.baseList = baseList.data
      }
    }
  },

  computed: {
    unSelect() {
      return this.baseList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
    }
  }
 
};
</script>

<style lang="css">

.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>