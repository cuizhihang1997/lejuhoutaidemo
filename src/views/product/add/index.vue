<template>
  <div class="save">
    <div class="step">
      <el-steps :space="400" :active="step" align-center finish-status="success">
        <el-step title="商品基本信息"></el-step>
        <el-step title="商品库存信息"></el-step>
        <el-step title="添加关联"></el-step>
      </el-steps>


    </div>

    <el-card class="card" boxShadow="never">

      <el-form ref="form" class="form" :model="form" label-width="80px">

        <div class="step1" v-show="step==1">

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-input v-model="form.gname"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="品牌">

                <el-select v-model="form.brand_id" placeholder="请选择品牌">
                  <el-option v-for="item in brandList" :key="item.id" :label="item.cname" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="原产地">
                <el-cascader placeholder="请选择原产地" v-model="selectedCity" :options="cityOptions"
                  @change="handleChangeCity"></el-cascader>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品编码">
                <el-input v-model="form.pcode" placeholder="商家自定义"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="关键词">
                <el-input v-model="form.keywords" placeholder="不要用逗号"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="商品描述">
                <el-input v-model="form.descr" placeholder="商品描述:例如:这是虚空KING!"></el-input>
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

              <el-image class="cover-img" :src="form.cover_img">

                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>


            </el-col>

          </el-row>


          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否上架">
                <el-switch v-model="form.isshow" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
                  inactive-value="0">
                </el-switch>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="是否最热">
                <el-switch v-model="form.ishot" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
                  inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否最新">
                <el-switch v-model="form.isnew" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
                  inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item width="100" label="进价">
                <el-input-number v-model="form.price_in" :min="0"></el-input-number>(单位:分)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="售价">
                <el-input-number v-model="form.price_out" :min="0"></el-input-number>(单位:分)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当前价格">
                <el-input-number v-model="form.price_now" :min="0"></el-input-number>(单位:分)
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item width="100" label="重量">
                <el-input-number v-model="form.weight" :min="0"></el-input-number>(单位:克)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排序">
                <el-input-number v-model="form.sort" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item width="100" label="库存">
                <el-input-number v-model="form.sku_count" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位名称">
                <el-input v-model="form.unit_name" placeholder="比如:个/辆/台..."></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="商品分类">
                <el-checkbox-group v-model="form.kindIds">
                  <el-checkbox v-for="item in kindList" :label="item.id" :key="item.id">{{item.ctitle}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="系列">
                <el-select size="small" v-model="form.seriesId" placeholder>
                  <el-option v-for="item in seriesList" :key="item.id" :label="item.cname" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="送货服务">
                <!-- <el-checkbox-group v-model="form.service_promise" @change="handleCheckedCitiesChange">
                
                  <el-checkbox :label="0">无</el-checkbox>
                  <el-checkbox :label="1">送货入户</el-checkbox>
                  <el-checkbox :label="2">上门安装</el-checkbox>
                </el-checkbox-group> -->

                <el-radio-group v-model="form.service_promise">
                  <el-radio :label="0">无</el-radio>
                  <el-radio :label="1">送货入户</el-radio>
                  <el-radio :label="2">上门安装</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

        </div>
        <div class="step2" v-show="step==2">

          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="详情标题">
                <el-input size="small" v-model="form.detail_title" placeholder="仙女凳/减肥凳"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="副标题">
                <el-input size="small" v-model="form.detail_desc" placeholder="仙女凳/减肥凳/红色/绿色/黄色/橘黄色"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="轮播图">
                <el-upload action="/api/leju/admin/material/uploadImg" :on-success="deImgsSuces">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,最多4张图片</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-image class="detail-img" v-for="item in form.imgs" :key="item" :src="item"></el-image>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="16">
              <el-form-item label="添加sku">
                <span>颜色:</span>
                <el-checkbox-group v-model='colorSel'>
                  <el-checkbox v-for="item in colorObjList" :key="item.id" :label="item" v-model="item.color_text">
                    <span :style="{color:item.color}">{{item.color_text}}</span>
                    <span style="font-size:12px;" @click="delColor(item.tempId)">删除</span>
                  </el-checkbox>
                </el-checkbox-group>

                <el-input size="small" style="width:160px" v-model="colorObj.color_text" placeholder="颜色描述:比如土豪金">
                </el-input>
                <el-input size="small" style="width:160px" v-model="colorObj.color" placeholder="色值:比如#ff0055">
                </el-input>
                <el-button size="small" type="primary" @click="addColorObj">创建</el-button>
                <!-- 避免误操作 另起一行 -->
                <div>
                  <el-button v-show="colorObjList" type="small" @click="createSkus">{{skuList.lenght>0?'重新生成':'生成'}}
                  </el-button>
                </div>
                <el-table :data="skuList" border stripe>
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
                      <el-button style="color:red" size="mini" type="text" @click="removeSku(scope.row.tempId)">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="16">

              <TinEditor ref="tine"> </TinEditor>
            </el-col>

          </el-row>

        </div>

        <div class="step3" v-show="step==3">

          <el-transfer v-model="glList" :data="dataF" :titles="['所有商品', '选中商品']"></el-transfer>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.bak" placeholder="填写备注信息"></el-input>

          </el-form-item>
        </div>

        <div class="footer-btns">
          <el-button size="small" v-show="step>1" type="default" @click="step--">返回上一步</el-button>

          <el-button size="small" v-show="step<3" type="primary" @click="step++">
            {{step == 1? '下一步,填写库存信息' : '下一步,填写关联商品' }}</el-button>
          <el-button size="small" v-show="step==3" type="primary" @click="doSave">提交保存</el-button>
          <el-button size="small" type="primary" @click="ss()"></el-button>

        </div>
      </el-form>

    </el-card>

    <button @click="confrom"></button>
  </div>
</template>

<script>
  import _ from "lodash";

  import brandApi from "@/api/brand/index"
  import kindApi from "@/api/kind/index"
  import TinEditor from "@/components/Tinymce";

  import seriesApi from "@/api/series/index"
  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'

  import productApi from "@/api/product/index"

  export default {
    name: "save",

    data() {

      return {
        id: "",
        glList: [],
        colorSel: [],
        colorObjList: [],
        colorObj: {

        },
        dataF: [],
        skuList: [],

        step: 1,
        form: {
          //  origin_city:[],

          cover_img: "",
          isshow: "1",
          kindIds: [],
          seriesId: [],
          service_promise: [],
          imgs: [],
        },
        brandList: "",
        cityOptions: regionDataPlus,
        selectedCity: [],
        fileList: [],
        kindList: [],
        seriesList: [],
        productList: [],

      }
    },
    methods: {
      ss() {

        this.getKindList()

        console.log(this.form.kindIds)
      },
      handleCheckedCitiesChange(value) {

        console.log(value)
        console.log(this.form.service_promise)
        // let checkedCount = value.length;
        // this.checkAll = checkedCount === this.cities.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      removeSku(val) {
        this.skuList = this.skuList.filter(ele => ele.tempId != val)
      },
      delColor(val) {

        this.colorObjList = this.colorObjList.filter(ele => ele.tempId != val)
      },
      doSave() {

        // console.log(this.$refs.tine.getContent())
        // console.log(this.glList)

        for (var i = 0; i < this.skuList.length; i++) {
          this.form['skuList[' + i + ']'] = this.skuList[i];
        }

        console.log(this.glList);

        console.log(this.glList.join(','));
        this.form.link1 = this.glList.join(',');
        this.form.content = this.$refs.tine.getContent()

        this.form.origin_code = this.selectedCity.join(',')

        if (this.$route.params.id) {
          //  var obj ={
          //    id:this.id,
          //    gname: this.form.gname,
          //    descr: this.form.descr ,
          //    cover_img:this.form.cover_img,
          //   //  attr_img: this.form.attr_img,
          //    brand_id:this.form.brand_id,
          //    origin_city:this.form.origin_city,
          //    kindIds:this.form.kindIds,
          //    origin_code:this.form.origin_code,
          //    pcode : this.form.pcode,
          //    unit_name : this.form.unit_name ,
          //    price_in:this.form.price_in,
          //    price_out:this.form.price_out,
          //    price_out: this.form.price_now,
          //    weight:this.form.weight,
          //    sort:this.form.sort,
          //    isnew:this.form.isnew,
          //    ishot:this.form.ishot,
          //    service_promise:this.form.service_promise,
          //    keywords:this.form.keywords,
          //    detail_title:this.form.detail_title,
          //    detail_desc:this.form.detail_desc,
          //    isshow:this.form.isshow,
          //    bak:this.form.bak,
          //    sku_count:this.form.sku_count,
          //    imgs:this.form.imgs,
          //    content:this.form.content,
          //    link1:this.form.link1,
          //    attr_img:this.form.imgs[0]







          //  }

          //    obj.imgs= obj.imgs.join(",")

          this.form.id = this.id
          // productApi.updateProduct(obj).then(res => {
          //   console.log(res)

          // })
          productApi.saveOrUpdate(this.form).then(res => {
            console.log(res)
            if (res.code == "success") {
              this.$router.push({
                name: "product"
              })
            }
          })
        }


        if (!this.$route.params.id) {
          productApi.saveOrUpdate(this.form).then(res => {
            console.log(res)
            if (res.code == "success") {
              this.$router.push({
                name: "product"
              })
            }
          })
        }




      },
      generateData() {

        // console.log()
        // const data = [];
        // for (let i = 0; i < this.productList.length; i++) {
        //   data.push({
        //     key: this.productList[i].link1 + i,
        //     label: this.productList[i].gname,
        //     idz: this.productList[i].link1,


        //   });
        // }
        // this.dataF = data

        // console.log(this.dataF, 111)


         this.productList.forEach(ele => {
            this.dataF.push({
              label: ele.gname,
              key: ele.id
            });
          });
      },
      addColorObj() {

        var colorObjNew = _.clone(this.colorObj);

        colorObjNew.tempId = Math.random()

        colorObjNew.sku_code = "",

          colorObjNew.price = 0,
          colorObjNew.count = 0
        // colorObjNew.istrue = false


        console.log(this.colorObj, this.colorObjList)

        console.log(this.colorSel, this.colorObjList)

        console.log()
        this.colorObjList.push(colorObjNew)


        this.colorObj = {}
      },
      createSkus() {

        this.colorSel.forEach(ele => {


          if (!this.skuList.some(elez => elez.tempId == ele.tempId)) {

            this.skuList.push(ele)

          }

        })

      },
      handleChangeCity(val) {

        console.log(this.selectedCity)
        this.form.origin_city = CodeToText[val[0]]
        this.form.origin_code = val

        console.log(this.form.origin_code)
      },
      coverSuccess(response) {
        console.log(response)
        this.form.cover_img = response.ossUrl

        console.log(this.form.cover_img)


      },
      deImgsSuces(res) {
        console.log(res)

        this.form.imgs.push(res.ossUrl)
      },
      confrom() {
        console.log(this.form)
      },
      // 品牌
      getBrandList() {

        brandApi.getList({

        }).then(res => {
          console.log(res)
          this.brandList = res.data.list
          console.log(this.brandList)
        })
      },

      // 分类
      getKindList() {

        kindApi.getList({

        }).then(res => {
          console.log(res, 123)

          this.kindList = res.data
          // this.form.kindIds = []
          // this.kindList.forEach(item => this.form.kindIds.push(item.id))
          // this.form.kindIds =  this.kindList.id
          console.log(this.form.kindIds, 99)
          console.log(this.kindList)
        })
      },
      // 系列
      getSeriesList() {

        seriesApi.getList({

        }).then(res => {
          this.seriesList = res.data
        })
      },
      getpriductList() {

        productApi.getList({

        }).then(res => {

          this.productList = res.data.list
          console.log(this.productList)

          this.generateData()

        })
      },
      getListz() {
        productApi.getDetail({
            id: this.id
          }


        ).then(res => {
          console.log(res, 222)
          this.form = res.data
          this.form.imgs = res.data.imgs.split(',')

          this.skuList = res.data.skuList
     
          this.$refs.tine.setContent(res.data.content)
          
          this.form.kindIds = this.form.kindIds.split(","),

        
           this.glList =  this.form.link1.split(",")

           console.log(this.glList,2131231)

          // res.data.kindIds.forEach(ele => this.form.kindIds.push(ele))

          // this.form.kindIds= this.form.kindIds.spilt(",")
          // this.selectedCity.push(res.data.origin_code)


          this.selectedCity = res.data.origin_code.split(",")

          console.log(this.selectedCity, 555)
        })
      }


    },
    components: {
      TinEditor

    },
    created() {

      this.getBrandList()

      this.getSeriesList()

      this.getpriductList()
           this.getKindList()

      console.log(this.$route)
      if (this.$route.params.id) {
        this.id = this.$route.params.id

        this.getListz()
      }



    },
    mounted() {

    },
  }

</script>

<style scoped lang='scss'>
  .save {
    height: 100%;
    width: 100%;
    padding: 20px;

    .card {
      margin: 30px;
    }

    .form {
      margin: 30px auto;

      .cover-img,
      .detail-img {
        width: 120px;
        height: 120px;
      }

      .footer-btns {
        margin: 0 auto;
        text-align: center
      }
    }
  }

</style>
