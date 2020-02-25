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
  </el-table>
  
    </el-card>

   
  </div>
</template>

<script>
  import Api from "@/api/sku/index"
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

ul{
  width: 200px;
  height: 20px;
  li{
    height: 100%;
    width: 10%;
    margin-left: 20px;
    background-color: green;
    float: left;
  }
  .rez{
    background-color: red;
  }
}
</style>
