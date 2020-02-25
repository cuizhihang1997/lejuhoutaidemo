<template>
  <div class="brand">


    <el-card class="box-card">
      <div slot="header" class="clearfix">
      
        <el-button style="float:left; "  @click="dialogVisible=true">操作按钮</el-button>
      </div>
       <el-table
    :data="tableData"
    border
    style="width: 100%">
        <el-table-column
      type="index"
      width="50">
    </el-table-column>
 
    <el-table-column
      prop="cname"
      label="品牌名称(中文)"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ename"
      label="品牌名称(英文)"
      width="180">
    </el-table-column>
     <el-table-column
      prop="descr"
      label="品牌描述(英文)"
      width="180">
    </el-table-column>
    <el-table-column
        label="品牌图片"
      width="180">
       <template slot-scope="scope">
            <el-image :src="scope.row.coverImg"></el-image>
          </template>
    </el-table-column>
     <el-table-column
      prop="addTime"
      label="添加时间"
      width="180">
    </el-table-column>
     <el-table-column align="center"  label="操作" width="180">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goDetail(scope.row.id)">查看详情</el-button>
            <el-button size="mini" @click="open(scope.row.id)">删除</el-button>

            </template>
        </el-table-column>
  </el-table>
 
    </el-card>
     <el-dialog title="新增" :visible.sync="dialogVisible" width="30%" >
      <el-form ref="form" class="form" :model="form" label-width="80px">

  <el-row :gutter="20">
             <el-col :span="8">
              <el-form-item label="中文名">
                <el-input size="small" v-model="form.cname" placeholder="李宁"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="英文名">
                <el-input size="small" v-model="form.ename" placeholder="lining"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="描述">
                <el-input size="small" v-model="form.descr" placeholder="中国品牌zz"></el-input>
              </el-form-item>
            </el-col>
         
          </el-row>

       <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="封面图片">
                <el-upload class="upload-demo" action="/api/leju/admin/material/uploadImg" :on-success="coverSuccess"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>


              </el-form-item>

            </el-col>
            <el-col :span="10">

              <el-image class="cover-img" :src="form.coverImg">

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
  import Api from "@/api/brand/index"
  export default {
    data() {
      return {
 

         tableData:[],
           dialogVisible: false,

        form:{

            coverImg:"",
        },
        fileList:[]
      } 
    },
    methods: {
 
 goDetail(idz){
     

     this.dialogVisible =true 

     Api.getDel({
       id:idz
     }).then(res=>{
       console.log(res)

       this.form = res.data
     })

 },
 dosave(){
               

               this.dialogVisible= false;

               
                Api.saveOrUpdate(this.form).then(res=>{
                    console.log(res)

                    this.getList()
                })
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
 coverSuccess(response) {
        console.log(response)
        this.form.coverImg = response.ossUrl

    


      },
      getList() {
        Api.getList().then(res => {
          console.log(res)
          this.tableData= res.data.list
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

.box-card{
    margin: 30px;
}
</style>
