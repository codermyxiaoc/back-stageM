<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="showdialog">添加</el-button>
    <el-table style="width: 100%" border :data="list">
      <el-table-column prop="prop" label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletetradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px; textAlign: center;" :current-page="page" :total="total" :page-size="limit"
      :page-count="7" :page-sizes="[3, 5, 10]" layout="prev, pager, next, jumper,->, total, sizes"
      @size-change="handleSizeChange" @prev-click="handleSizeChange" @next-click="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form style="width:80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/goods-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddOrupdataTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateTradeMark',

  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输品牌名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌的logo', trigger: 'change' }
        ]
      }
    }
  },

  mounted() {
    this.getdata()
  },

  methods: {
    getdata() {
      this.$API.tradeMark.reqTradeMarkList(this.page, this.limit).then(res => {
        if (res.code === 200) {
          this.total = res.data.total
          this.list = res.data.records
        }
      })
    },
    handleCurrentChange(page) {
      this.page = page
      this.getdata()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getdata()
    },
    showdialog() {
      this.tmForm.tmName = '',
      this.tmForm.logoUrl = ''
      this.dialogFormVisible = true
    },
    async updataTradeMark(row) {
      this.dialogFormVisible = true
      this.tmForm.tmName = row.tmName 
      this.tmForm.logoUrl = row.logoUrl
      this.tmForm.id = row.id
      this.getdata()
    },
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    AddOrupdataTradeMark() {
      this.$refs.ruleForm.validate(async (valid) => {
        if(valid) {
          this.dialogFormVisible = false
          const result = await this.$API.tradeMark.reqAddOrupdataTradeMark(this.tmForm)
          if (result.code === 200) {
            this.$message(
              {
                showClose: true,
                message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
                type: 'success'
              })
            delete this.tmForm.id
            this.getdata()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      }
    )},
    deletetradeMark(row) {
      this.$confirm(`你确定要删除${row.tmName}品牌`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.$API.tradeMark.reqdeleteTradeMark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getdata()
        }
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  }
}
</script>

<style lang="css">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
