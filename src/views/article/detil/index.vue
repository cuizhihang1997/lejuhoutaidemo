<template>
  <div class="save">
 

    <el-card class="card" boxShadow="never">

      <el-form ref="form" class="form" :model="form" label-width="80px">

        <div class="step1" v-show="step==1">

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>

            </el-col>
           
        
            <el-col :span="8">
              <el-form-item label="作者">
                <el-input v-model="form.author" placeholder="商家自定义"></el-input>
              </el-form-item>


            </el-col>
             <el-col :span="8">
              <el-form-item label="价格">
                <el-input v-model="form.price" placeholder="商家自定义"></el-input>
              </el-form-item>


            </el-col>
        

          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="颜色1">
                <el-input v-model="form.color1" placeholder="#fff"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="颜色2">
                <el-input v-model="form.color2"  placeholder="#fff"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="颜色3">
                <el-input v-model="form.color3" placeholder="#fff" ></el-input>
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

                <!-- <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div> -->
              </el-image>


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
          </el-row>
        
          
            

           
       
              <TinEditor ref="tine"> </TinEditor>
     
        </div>
 
          <el-button size="small" style=" float:right" type="primary" @click="doSave">提交保存</el-button>
      
      </el-form>

    </el-card>

    <!-- <button @click="confrom"></button> -->
  </div>
</template>

<script>

  import kindApi from "@/api/kind/index"
  import TinEditor from "@/components/Tinymce";

  import Api from "@/api/article/index"

export default {
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

          coverImg: "",
         
          kindIds: [],
         
        
         
        },
        brandList: "",
      
        selectedCity: [],
        fileList: [],
        kindList: [],
        seriesList: [],
        productList: [],
    }
  },
  methods: {
    
    doSave(){
          

        this.form.content1 = this.$refs.tine.getContent()

        this.form.content2 = this.$refs.tine.getContent()

        

        
          Api.doSaveOrUpdate(this.form).then(res=>{
              console.log(res)
          })
    },

    coverSuccess(response) {
        console.log(response)
        this.form.coverImg = response.ossUrl

        console.log(this.form.coverImg)


      },

      getDel(){ 


          Api.getDel({ id :this.$route.params.id}).then(res=>{
              console.log(res)
              this.form= res.data
                console.log(this.form,1)
            
               
          this.$refs.tine.setContent(res.data.content2)
          this.form.id=this.$route.params.id

          this.form.kindIds =  this.form.kindIds.split(",")


          })
       

      },
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
  },
  components: {
 

 TinEditor
  },
  created(){
      


    console.log(this.$route.params)

    if(this.$route.params.id){
      this.getDel()
    }



    this.getKindList()

  },
  mounted(){

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
