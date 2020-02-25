import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/brand/list",
      method:"get",
      data

  })
}
function saveOrUpdate(data){

    return request({
         url:"/api/leju/admin/brand/saveOrUpdate",
         method:"get",
         data
   
     })
   }
   function getDel(data){

    return request({
         url:"/api/leju/admin/brand/detail",
         method:"get",
         data
   
     })
   }

export default {

    getList ,
    saveOrUpdate,
    getDel
}