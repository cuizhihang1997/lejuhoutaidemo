import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/article/list",
      method:"get",
      data

  })
}


function doSaveOrUpdate(data){

    return request({
         url:"/api/leju/admin/article/saveOrUpdate",
         method:"post",
         data
   
     })
   }

   function getDel(data){

    return request({
         url:"/api/leju/admin/article/detail",
         method:"get",
         data
   
     })
   }

  
export default {

    getList ,
    doSaveOrUpdate,
    getDel
    
}   