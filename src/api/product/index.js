import request from "@/api/request.js"


function getList(data){

 return request({
      url:"/api/leju/admin/product/list",
      method:"get",
      data

  })
};


function saveOrUpdate(data){

    return request({
         url:"/api/leju/admin/product/saveOrUpdate",
         method:"post",
         data
   
     })
   }



   function updateProduct (data){

    return request({
         url:"/api/leju/admin/product/updateProduct",
         method:"post",
         data
   
     })
   }
   function getDetail(data){

    return request({
         url:"/api/leju/admin/product/detail",
         method:"get",
         data
   
     })
   }

   function delList(data){

    return request({
         url:"/api/leju/admin/product/delete",
         method:"get",
         data
   
     })
   }

   
export default {

    getList ,
    saveOrUpdate,
    updateProduct,
    getDetail,
    delList
}