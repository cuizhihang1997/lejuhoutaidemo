import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
 
import { getToken, removeToken } from '@/utils/auth'
// 用于处理对提交对象进行序列化
import qs from 'qs'
import router from '@/router'
// create an axios instance
// process.env 指的是当前的运行环境 所对应的 配置文件
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (true) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      //设置请求头 
      config.headers['bf-Token'] = 'asdfsadfasdf'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 说明非法访问 
    if(res.tokenCode === 5000){
      Message({
            message: '访问超时,请重新登陆!',
            type: 'error',
            duration: 5 * 1000
      })
      // 清空token
      removeToken();
      //跳转首页
      router.push('/');
      return Promise.reject();  
    }
    return res;

    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

function http(config){
  //动手脚
  if(config.method.toLowerCase() == 'post'){
    // qs系列化  
    // https://www.npmjs.com/package/qs 
    //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
    //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat',allowDots: true  })
  }else{
    config.params = config.data
  }

  return  service(config);
}
export default http
