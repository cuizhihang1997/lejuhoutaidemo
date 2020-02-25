import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/kind/list",
      method:"get",
      data

  })
}

function delList(data){

    return request({
         url:"/api/leju/admin/kind/del",
         method:"get",
         data
   
     })
   }
   

export default {

    getList ,
    delList,
}