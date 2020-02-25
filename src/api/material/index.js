import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/material/list",
      method:"get",
      data

  })
}

function delList(data){

    return request({
         url:"/api/leju/admin/material/del",
         method:"get",
         data
   
     })
   }
   

   function uploadAndSaveImg(data){

    return request({
         url:"/api/leju/admin/material/uploadAndSaveImg",
         method:"post",
         data
   
     })
   }
      
export default {

    getList ,
    delList,
    uploadAndSaveImg
}