import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/series/list",
      method:"get",
      data

  })
}


export default {

    getList ,
}