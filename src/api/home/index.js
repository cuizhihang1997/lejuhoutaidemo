import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/home/banners",
      method:"get",
      data

  })
}

function delList(data){

    return request({
         url:"/api/leju/admin/home/bannerDelete",
         method:"get",
         data
   
     })
   }


   function bannerSave(data){

    return request({
         url:"/api/leju/admin/home/bannerSave",
         method:"post",
         data
   
     })
   }
   

export default {

    getList ,
    delList,
    bannerSave
}