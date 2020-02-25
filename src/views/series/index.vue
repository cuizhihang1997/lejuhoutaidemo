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
      prop="cname"
      label="系列名称(中文)"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ename"
      label="系列名称(英文)"
      width="180">
    </el-table-column>
    <el-table-column
        label="系列图片"
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
    <el-table-column align="center"  label="操作" width="100">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goDetail(scope.row.orderId)">查看详情</el-button>
            </template>
        </el-table-column>
  </el-table>
  
    </el-card>
  </div>
</template>

<script>
  import Api from "@/api/series/index"
  export default {
    data() {
      return {
 

         tableData:[],
      } 
    },
    methods: {


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
