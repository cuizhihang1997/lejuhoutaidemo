import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/client/userList",
      method:"get",
      data

  })
}


function saveOrUpdate(data){

    return request({
         url:"/api/leju/admin/productSku/saveOrUpdate",
         method:"post",
         data
   
     })
   }




export default {

    getList ,
    saveOrUpdate
}