<template>
  <div class="product">
    <el-card class="serch card">

      <div slot="header" class="clearfix">
        <span>查询条件</span>

      </div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-input size="small" v-model="search.gname" placeholder="商品名称/模糊查询"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input size="small" v-model="search.pcode" placeholder="商品编码"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select size="small" v-model="search.brandId" placeholder="品牌"></el-select>
        </el-col>
        <el-col :span="6">
          <el-select size="small" v-model="search.kindId" placeholder="分类"></el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="default" size="mini" @click="doReset">重置</el-button>
          <el-button type="primary" size="mini" @click="doSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <router-link to='/add'>
          <el-button type="primary" @click="goAdd">新增</el-button>
        </router-link>
      </div>
      <el-table :data="tableData" border style="width: 100%">

        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="商品图片" width="180">

          <template slot-scope="scope">
            <el-image :src="scope.row.cover_img"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" width="280">

          <template slot-scope="scope">

            <p> {{scope.row.gname}}</p>

            <p> 关键词:{{scope.row.keywords}}</p>
            <p>品牌:{{scope.row.brandName}}| {{scope.row.brandEname}}</p>

            <p>描述:{{scope.row.descr}}</p>


          </template>


        </el-table-column>
        <el-table-column label="标签" width="180">

          <template slot-scope="scope">
            上架: <el-switch v-model="scope.row.isshow" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
              :inactive-value="0">>
            </el-switch>
            最热: <el-switch v-model="scope.row.ishot" active-color="#13ce66" inactive-color="#ff4949" :active-value="0"
              :inactive-value="1">>
            </el-switch>
            最新: <el-switch v-model="scope.row.isnew" active-color="#13ce66" inactive-color="#ff4949" :active-value="0"
              :inactive-value="1">>
            </el-switch>

          </template>


        </el-table-column>
        <el-table-column align="center" label="价格货号" width="180">

          <template slot-scope="scope">
            <p>价格:💴 {{scope.row.price_now}}</p>
            <p>货号: {{scope.row.pcode}}</p>




          </template>


        </el-table-column>
        <el-table-column align="center" label="所属分类" width="180">

          <template slot-scope="scope">
            <p>{{scope.row.ctitles}}</p>




          </template>


        </el-table-column>
          <el-table-column align="center" label="查看sku" :width="180">
          <template slot-scope="scope">
          <i style="color: #409EFF;" class="el-icon-edit" @click="showSkuList(scope.row)">查看sku</i>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排序" width="180">



        </el-table-column>
        <el-table-column align="center" prop="origin_city" label="原产地" width="180">



        </el-table-column>
        <el-table-column align="center" prop="addtime" label="添加时间" width="180">



        </el-table-column>
        <el-table-column align="center" label="操作" :width="360">
          <template slot-scope="scope">


            <el-button size="mini" type="primary" @click="goEdit(scope.row.id)">编辑</el-button>

            <el-button  size="mini"   @click="open(scope.row.id)">删除</el-button>



          </template>
        </el-table-column>



      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10,20,30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <el-dialog
      :title="tempSkuObj.title"
      :visible.sync="dialog"
      width="40%"
      @close="handleSkuClose">
      <el-table :data="tempSkuObj.skuList" border stripe>
                  <el-table-column prop="color_text" label="颜色" :width="120"></el-table-column>
                  <el-table-column prop="color" label="色值" :width="120"></el-table-column>
                  <el-table-column label="sku编码" :width="200">
                    <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.sku_code" placeholder="自定义sku编码"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="价格" :width="160">
                    <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.price" placeholder="价格,单位:分"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="库存" :width="160">
                    <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" :width="160">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="doSaveSku(scope.row)"
                      >提交修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
      
    </el-dialog>
    </el-card>

  </div>
</template>

<script>
  import Api from "@/api/product/index.js"
import skuApi from '@/api/sku/index.js';

  export default {
    data() {
      return {
            tempSkuObj:{
        title: '',
        id:'',
        skuList:[]
      },
        dialog:false,
        visible: false,
        currentPage: 10,
        tableData: [],
        total: 0,
        search: {
          gname: "",
          pcode: "",
          brandId: "",
          kindId: ""


        }
      }
    },
    methods: {
         doSaveSku(sku){
      skuApi.saveOrUpdate(sku)
        .then(res=>{
          if(res.code == 'success'){
            this.$message.success('更新成功!');
          }else{
            this.$message.error('更新失败!');
          }
        })
    },
        showSkuList(row){
      this.dialog = true;
      skuApi.getList({
        productId:row.id
      }).then(res=>{
        this.tempSkuObj = {
          id: row.id,
          title: row.gname,
          skuList: res.data
        }
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

      dodelz(idz) {



      },
      goEdit(idz) {
        this.$router.push({
          name: 'add',
          params: {
            id: idz
          }
        })

      },
      handleSizeChange() {

      },
      handleCurrentChange() {

      },
      doReset() {

      },
      doSearch() {
          this.getList()
      }, 

      goAdd() {

      },
      getList() {


        Api.getList({

          start: 1,
          limit: 10,
         gname:this.search.gname,
         pcode:this.search.pcode,
         brandId:this.search.brandId,
         kindId:this.search.kindId



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
  .product-main {
    .card {
      margin: 30px;
    }

    .search-box {
      .el-input {
        width: 200px;
      }
    }
  }

</style>
