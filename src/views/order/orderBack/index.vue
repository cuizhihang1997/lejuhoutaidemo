<template>
  <div class="order-back-main">
    <el-card class="search-box card" shadow="never">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-input size="small" v-model="search.username" placeholder="用户名/模糊查询"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select size="small" clearable v-model="search.process" placeholder="订单状态">
            <!-- 进度: 0 等待处理 ; 1 确认退货,等待收货; 2 : 确认收货,已退款 ; 9 : 拒绝退货 -->
            <el-option label="等待处理" value="0"></el-option>
            <el-option label="正在处理" value="1"></el-option>
            <el-option label="已处理" value="2"></el-option>
            <el-option label="拒绝退货" value="9"></el-option>
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
        <el-table-column align="center" prop="orderId" label="订单编号" :width="200"></el-table-column>
        <el-table-column align="center" prop="addtime" label="申请时间" :width="200"></el-table-column>
        <el-table-column align="center" prop="username" label="用户账号" :width="160"></el-table-column>
        <el-table-column align="center" prop="order_price" label="订单金额" :width="160"></el-table-column>
        <el-table-column align="center" prop="count" label="订单数量" :width="160"></el-table-column>
        <!-- <el-table-column align="center" prop="orderStatus" label="订单状态" :width="160"></el-table-column> -->

        <el-table-column align="center" prop="statusend" label="是否关闭" :width="160">
          <template slot-scope="scope">{{scope.row.statusend=='0'?'正在进行':'已关闭'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="endtime" label="完成时间" :width="160"></el-table-column>

        <el-table-column align="center" label="操作" :width="360">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="goDetail(scope.row.backId)">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import orderBackApi from "@/api/order/orderBack";
export default {
  name: "OrderBack",
  components: {},
  data() {
    return {
      search: {},
      orderList: []
    };
  },
  computed: {},
  created() {
    this.getOrderBackList();
  },
  mounted() {},
  methods: {
    doReset() {},
    doSearch() {},
    getOrderBackList() {
      orderBackApi.orderList().then(res => {
        this.orderList = res.data.list;
      });
    },
    goDetail(backId) {
        this.$router.push({name:'orderBackDetail',params:{backId}});
    }
  }
};
</script>

<style scoped lang="scss">
.order-back-main {
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
