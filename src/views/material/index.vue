<template>
  <div class="kind">


    <el-card class="box-card">
      <div slot="header" class="clearfix">

        <el-button style="float: left; " @click="dialogVisible = true">新增素材</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>

        <el-table-column prop="fileName" label="素材编号" width="180">
        </el-table-column>
        <el-table-column prop="etitle" label="商品名称(英文)" width="180">
        </el-table-column>
        <el-table-column label="图片" width="180">
          <template slot-scope="scope">
            <el-image :src="scope.row.ossUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="添加时间" width="180">
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="goDetail(scope.row.orderId)">查看详情</el-button>
            <el-button size="mini" @click="open(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,30]"
          :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" class="form" label-width="80px">



        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="封面图片">

              <el-upload class="upload-demo" ref="upload" action="/api/leju/admin/material/uploadAndSaveImg"
               :on-success="coverSuccess"   :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传到服务器
                </el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>


            </el-form-item>

          </el-col>
          <el-col :span="10">

            <el-image class="cover-img" :src="img_url">

              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>


          </el-col>

        </el-row>


      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dosave()">确 定</el-button>



      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Api from "@/api/material/index"
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        total: 1,

        start: 1,
        limit: 10,
        img_url: '',
        fileList: []
      }
    },
    methods: {


      submit() {




        this.$refs.upload.submit()


        // Api.uploadAndSaveImg(
        //   {
        //     file:this.img_url
        //   }
        // ).then(res=>{
        //     console.log(res)

        //     this.getList()
        // })
      },
      coverSuccess(response, file) {
        console.log(response)
        this.img_url = response.ossUrl

        console.log(file)
        this.dialogVisible = false;
        this.getList()
        
        console.log(this.img_url)
           
            this.$message({

            type: 'success',
            message: '上传成功!'

          });



      },
      open(idz) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


          this.$message({

            type: 'success',
            message: '删除成功!'

          });
          //  this.dodelz(idz)
          // console.log(Api.delList())
          Api.delList({
            id: idz
          }).then(res => {
            console.log(res)
            this.getList()

          })

          console.log(12312)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSizeChange(val) {


        console.log(val)
        this.limit = val
        this.getList()

      },
      handleCurrentChange(val) {


        this.start = val


        this.getList()

      },

      getList() {
        Api.getList({

          start: this.start,
          limit: this.limit
        }).then(res => {
          console.log(res)
          this.tableData = res.data.list
          this.total = res.data.totalRow
        })
      }
    },
    components: {

    },
    created() {



      this.getList()

    },
    mounted() {

    },
  }

</script>

<style scoped lang='scss'>
  .box-card {
    margin: 30px;
  }

</style>
