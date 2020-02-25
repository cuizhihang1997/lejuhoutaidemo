<template>
    <!-- 订单详情页 需要查询3种数据 -->
  <div class="order-detail-main">
    <div class="steps-bar">
      <el-steps :space="300" :active="step" finish-status="success">
        <!-- addTime  订单添加时间
        sendTime  发货时间
        receiveTime  收货时间(客户端)
        bacckTime  用户申请退款时间
        doneTime  订单关闭时间 -->
        <el-step title="已付款" :description="orderBaseInfo.addTime"></el-step>
        <el-step title="已发货" :description="orderBaseInfo.sendTime"></el-step>
        <el-step v-if="orderBaseInfo.orderStatus=='9'" title="申请退货" :description="orderBaseInfo.backTime"></el-step>
        <el-step v-else title="已收货" :description="orderBaseInfo.receiveTime"></el-step>
        <el-step title="已关闭" :description="orderBaseInfo.doneTime"></el-step>
      </el-steps>
    </div>
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>当前订单状态: </span>
        <span style="color: green;" v-if="orderBaseInfo.statusend == '0'">订单处理中...</span>
        <span style="color: red;" v-else>订单已关闭</span>
      </div>
      <!-- 基本信息 -->
      <div class="block-title">基本信息:</div>
      <div class="table-layout baseInfo">
        <el-row>
          <el-col :span="4" v-for="(v,key) in orderBaseInfoCom" :key="key">
            <div class="table-cell-head">
              <span>{{key}}</span>
            </div>
            <div class="table-cell-body">
              <span>{{v}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 收货人信息 -->
      <div class="block-title">收货人信息:</div>
      <div class="table-layout userInfo">
        <el-row>
          <el-col :span="6" v-for="(v,key) in userInfoCom" :key="key">
            <div class="table-cell-head">
              <span>{{key}}</span>
            </div>
            <div class="table-cell-body">
              <span>{{v}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 商品信息 -->
      <div class="block-title">商品信息:</div>
      <div class="product-list-block">
        <el-table class="product-list" :data="orderDetailList" border stripe>
          <el-table-column type="index" :width="50"></el-table-column>
          <el-table-column align="center" prop="gname" label="商品图片" :width="180">
            <template slot-scope="scope">
              <el-image class="cover-img" :src="scope.row.cover_img"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品名称" :width="380">
            <template slot-scope="scope">
              <p>{{scope.row.gname}}</p>
              <p>品牌: {{scope.row.brandName}} | {{scope.row.brandEname}}</p>
              <p>{{scope.row.descr}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="价格货号" :width="380">
            <template slot-scope="scope">
              <p>价格: ￥{{scope.row.price/100}}</p>
              <p>货号:{{scope.row.sku_code}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="型号" :width="180">
            <template slot-scope="scope">
              <p>{{scope.row.color_text}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="count" label="数量" :width="180"></el-table-column>
          <el-table-column align="center" prop="count" label="小计" :width="180">
            <template slot-scope="scope">
              <p>￥{{scope.row.price/100*(scope.row.count)}}</p>
            </template>
          </el-table-column>
        </el-table>
        <div class="price-sum">
          合计:
          <span>￥{{500}}</span>
        </div>
      </div>

      <!-- 费用信息 -->
      <div class="block-title">费用信息:</div>
      <div class="table-layout costInfo">
        <el-row>
          <el-col :span="6" v-for="(v,key) in costInfoCom" :key="key">
            <div class="table-cell-head">
              <span>{{key}}</span>
            </div>
            <div class="table-cell-body">
              <span>{{v}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
  
    
    </el-card>

    <div style="margin:30px auto 60px; text-align: center;">
    
        <el-button v-if="step==1" type="primary" @click="sendDone">已发货</el-button>
        <el-button disabled  v-if="step==2"  type="primary">等待客户收货...</el-button>
        <el-button v-if="step==3" type="primary" @click="closeOrder">关闭订单</el-button>
        
    </div>
  </div>
</template>

<script>
import orderApi from "@/api/order/index";
export default {
    name:'OrderDetail',
  components: {},
  data() {
    return {
      orderId: "",
      orderDetailList: [],
      userInfo: {},
      orderBaseInfo: {} // 订单基本信息
    };
  },
  computed: {
    orderBaseInfoCom() {
      return {
        订单编号: this.orderBaseInfo.orderId,
        用户账号: this.orderBaseInfo.username,
        订单金额: this.orderBaseInfo.price,
        订单数量: this.orderBaseInfo.count,
        订单状态: this.orderBaseInfo.status,
        是否关闭: this.orderBaseInfo.statusend,
        下单时间: this.orderBaseInfo.addTime,
        发货时间: this.orderBaseInfo.sendTime,
        收货时间: this.orderBaseInfo.receiveTime,
        退单时间: this.orderBaseInfo.backTime,
        结束时间: this.orderBaseInfo.endTime,
        其他: ""
      };
    },
    userInfoCom() {
      return {
        收货人: this.userInfo.username + "(" + this.userInfo.name + ")",
        手机号码: this.userInfo.tel,
        邮政编码: "41000",
        地市: this.userInfo.cityStr,
        详细地址: this.userInfo.cityBak
      };
    },
    costInfoCom() {
      var sumPrice = this.orderDetailList.reduce((a, b) => {
        a += (b.price * b.count) / 100;
        return a;
      }, 0);
      return {
        商品合计: "￥" + sumPrice,
        运费: 0,
        订单金额: "￥" + sumPrice,
        实付款: "￥" + sumPrice
      };
    },
    step() {
        // 是否订单被关闭 跟statusend 有关
        if(this.orderBaseInfo.statusend == '1') return 4;
         
        return (this.orderBaseInfo.orderStatus-0) || 1;
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log("this.orderId", this.orderId);
    this.getOrderDetial();
    this.getOrderUserInfo();
    //查询订单基本信息
    this.getOrderBaseInfo();
  },
  mounted() {},
  methods: {
    getOrderDetial() {
      orderApi
        .orderDetail({
          orderId: this.orderId
        })
        .then(res => {
          this.orderDetailList = res.data;
        });
    },
    getOrderUserInfo() {
      orderApi
        .orderUserInfo({
          orderId: this.orderId
        })
        .then(res => {
          this.userInfo = res.data;
        });
    },
    //根据orderId查询订单基本信息
    getOrderBaseInfo() {
      orderApi
        .getList({
          orderId: this.orderId
        })
        .then(res => {
          this.orderBaseInfo = res.data.list[0];
        });
    },
    // 关闭订单,关闭后不能操作该订单
    closeOrder() {
        orderApi.closeOrder({id:this.orderBaseInfo.orderId})
            .then(res=>{
                if(res.code == 'S'){
                    //重新刷新页面
                    location.reload();
                }else{
                    this.$message.error(res.msg);
                }
            })
    },
    sendDone(){
        orderApi.sendDone({
            id:this.orderBaseInfo.orderId
        }).then(res=>{
            //成功后状态变为1
            if(res.code == 'S'){
                // 简单来说重新刷新页面  这个写法不会刷新
                // this.$router.push({name: 'orderDetail',params:{orderId: this.orderBaseInfo.orderId}})
                // console.log('fff')
                window.location.reload();
                // 订单状态 1 已付款 ; 2 已发货; 3: 已收货; 9 申请退款
                // this.orderBaseInfo.orderStatus = 2 ;
            }else{
                //res.msg是返回的错误信息
                this.$message.error(res.msg);
            }
        })
    }
  }
};
</script>

<style scoped lang="scss">
.order-detail-main {
  .card {
    margin: 30px 100px;
  }
  .steps-bar {
    margin-top: 30px;
    .el-steps {
      justify-content: center;
    }
  }
  .cover-img {
    width: 120px;
    height: auto;
  }
  .block-title {
    margin: 30px;
  }
  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;

    .el-row {
      box-sizing: border-box;
      .table-cell-head {
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        padding: 10px;
        font-size: 14px;
        text-align: center;
        color: #666;
        background-color: #f5f7fa;
      }
      .table-cell-body {
        height: 60px;
        line-height: 60px;
        color: #606266;
        overflow: hidden;
        text-align: center;
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
      }
    }
  }

  .product-list-block {
    .price-sum {
      text-align: right;
      font-size: 18px;
      margin: 30px;
      > span {
        color: red;
      }
    }
  }
}
</style>
