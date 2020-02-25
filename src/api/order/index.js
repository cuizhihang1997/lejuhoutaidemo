import request from '@/api/request'

function getList(data) {
    return request({
        url: '/api/leju/admin/order/list',  // 相对路径
        method: 'get',
        data
    })
}
function orderDetail(data) {
    return request({
        url: '/api/leju/admin/order/detail',  // 相对路径
        method: 'get',
        data
    })
}
function orderUserInfo(data) {
    return request({
        url: '/api/leju/admin/order/orderUserInfo',  // 相对路径
        method: 'get',
        data
    })
}


function sendDone(data) {
    return request({
        url: '/api/leju/admin/order/sendDone',
        method: 'get',
        data
    })
}
function closeOrder(data) {
    return request({
        url: '/api/leju/admin/order/closeOrder',
        method: 'get',
        data
    })
}


export default {
    getList,
    orderDetail,
    orderUserInfo,
 
    sendDone,
    closeOrder
}
