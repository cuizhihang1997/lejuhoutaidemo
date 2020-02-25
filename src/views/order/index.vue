<template>
  <div class="kind">
<el-card class="search-box card" shadow="never">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-input size="small" v-model="search.username" placeholder="用户名/模糊查询"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select size="small" clearable v-model="search.status" placeholder="订单状态">
            <!-- 订单状态  1 已付款 ;  2 已发货; 3: 已收货; 9 申请退款 -->
            <el-option v-for="(v,key) in orderStatusObj" :key="v" :label="v" :value="key"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select size="small" clearable v-model="search.statusend" placeholder="是否关闭">
            <el-option label="正在进行" value="0"></el-option>
            <el-option label="已关闭" value="1"></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <el-button type="default" size="mini" @click="doReset">重置</el-button>
          <el-button type="primary" size="mini" @click="doSearch">搜索</el-button>
        
        </el-col>
      </el-row>
    </el-card>

    <el-card class="content box card" shadow="never">
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" :width="50"></el-table-column>
        <el-table-column align="center" prop="orderId" label="订单编号" :width="200"> </el-table-column>
        <el-table-column align="center" prop="addTime" label="添加时间" :width="200"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" :width="160"></el-table-column>
        <el-table-column align="center" prop="price" label="订单金额" :width="160"></el-table-column>
        <el-table-column align="center" prop="count" label="订单数量" :width="160"></el-table-column>
        <el-table-column align="center" label="订单状态" :width="160">

            <template slot-scope="scope">
                {{scope.row.orderStatus=='1'? '已付款': scope.row.orderStatus=='2'? " 已发货":   scope.row.orderStatus=='3'? " 已收货":  scope.row.orderStatus=='9'? " 申请退款":  "未知状态"       }}
            </template>
        </el-table-column>
        
        <el-table-column align="center" prop="statusend" label="是否关闭" :width="160">
            <template slot-scope="scope">
                {{scope.row.statusend=='0'?'正在进行':'已关闭'}}
            </template>
        </el-table-column>
        <el-table-column align="center" prop="doneTime" label="完成时间" :width="160"></el-table-column>
        
        <el-table-column align="center"  label="操作" :width="360">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goDetail(scope.row.orderId)">查看订单</el-button>
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
  import Api from "@/api/order/index"
  export default {
    data() {
      return {
        total: 1,
        
        start:1,
        limit:10,

      //  start:"",
         search: {},
        //  limit:"",
      orderList: [],
      orderStatusObj: {
        "1": "已付款",
        "2": "已发货",
        "3": "已收货",
        "9": "申请退货"
      },
        

        
      } 
    },
    methods: {
  doReset() {

    this.search={
      
    }
  },
    doSearch() {

       this.getList() 
    },
       goDetail(orderId){
        this.$router.push({name:'orderDetail',params:{orderId}});
    },
      getList() {
        Api.getList({
        

          start:this.start ,
          limit:this.limit,
          username:this.search.username,
          status:this.search.status,
          statusend:this.search.statusend


        
        }).then(res => {
          console.log(res)
          this.orderList= res.data.list;
          this.total = res.data.totalRow



        })
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

  .rez{
    background-color: red;
  }

</style>
