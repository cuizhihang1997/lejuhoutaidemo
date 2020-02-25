<template>
  <div class="kind">


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分类</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
      prop="ctitle"
      label="商品名称(中文)"
      width="180">
    </el-table-column>
    <el-table-column
      prop="etitle"
      label="商品名称(英文)"
      width="180">
    </el-table-column>
    <el-table-column
        label="商品图片"
      width="180">
       <template slot-scope="scope">
            <el-image :src="scope.row.img"></el-image>
          </template>
    </el-table-column>
     <el-table-column
      prop="addTime"
      label="添加时间"
      width="180">
    </el-table-column>
    <el-table-column align="center"  label="操作" width="200">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goDetail(scope.row.orderId)">查看详情</el-button>

            <el-button  size="mini"   @click="open(scope.row.id)">删除</el-button>

            </template>
        </el-table-column>
  </el-table>
  
    </el-card>
  </div>
</template>

<script>
  import Api from "@/api/kind/index"
  export default {
    data() {
      return {
 

         tableData:[],
      } 
    },
    methods: {
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


      getList() {
        Api.getList().then(res => {
          console.log(res)
          this.tableData= res.data
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
