<template>
  <div class="article">


    <el-card class="box-card">
      <div slot="header" class="clearfix">
      
        <el-button type="primary" @click="goArtDel()">新增文章 </el-button>
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
      prop="title"
      label="文章名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="180">
    </el-table-column>
      <el-table-column
      prop="price"
      label="价格"
      width="180">
    </el-table-column>

      <el-table-column
      prop="color1"
      label="颜色1"
      width="180">
    </el-table-column>
     <el-table-column
      prop="color2"
      label="颜色2"
      width="180">
    </el-table-column>
     <el-table-column
      prop="color3"
      label="颜色3"
      width="180">
    </el-table-column>
     <el-table-column
      prop="kindCTitle"
      label="分类"
      width="180">
    </el-table-column>
    <el-table-column
        label="商品图片"
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
                <el-button size="mini" type="primary" @click="goArtDel(scope.row.id)">查看详情</el-button>
            </template>
        </el-table-column>
  </el-table>
    <div class="block">
        <span class="demonstration"></span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
          :page-sizes="[10,20,30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Api from "@/api/article/index"
  export default {
    data() {
      return {
 

         tableData:[],

         total: 1,
        
        start:1,
        limit:10,
      } 
    },
    methods: {
  handleSizeChange(val) {
        

        console.log(val)
        this.limit = val
     this.getList()

      },
      handleCurrentChange(val) {
       

       this.start = val
     

     this.getList()

      },
      goArtDel(idz){
          

          this.$router.push({name:"article/detilz", params:{id:idz} })
      },
      getList() {
        Api.getList({
            start:this.start ,
          limit:this.limit
        }).then(res => {
          console.log(res)
          this.tableData= res.data.list

          this.total= res.data.totalRow
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
