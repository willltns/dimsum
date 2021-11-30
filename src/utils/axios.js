// import qs from 'qs'
import axios from 'axios'
import Cookies from 'js-cookie'
import { notification } from 'antd'

import { encrypt } from '@/utils/encrypt/origin'

axios.defaults.baseURL = '/api-v1'

axios.defaults.timeout = 60000

// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded;charset=UTF-8'

// data is only applicable for request methods 'PUT', 'POST', and 'PATCH'
// axios.defaults.transformRequest = (data, header) => qs.stringify(data)

axios.interceptors.request.use(
  (config) => {
    const s = encrypt({ id: config.headers.mill_sec_, ...config.ARENA }) || ''
    config.headers.js_tt = s.slice(0, Math.floor(s.length / 2))
    Cookies.set('js_tt', s.slice(Math.floor(s.length / 2)))
    if (!config.headers.mill_sec_) config.headers.mill_sec_ = `${new Date().getTime()}`.slice(-4)
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
    const { data } = response

    if (data?.code === 200) return data.data
    if (data?.message && data?.code !== 1001) notification.error({ message: '', description: '服务异常，请稍后重试' })

    return Promise.reject(new CodeError(data))
  },

  (error) => {
    console.log('ERR', error)

    if (axios.isCancel(error)) return Promise.reject(error)

    if (error.message) {
      error.message.search('timeout') > -1 && notification.error({ message: '', description: '请求超时' })
      error.message.search('404') > -1 && notification.error({ message: '', description: '资源不存在' })
      error.message.search('400') > -1 && notification.error({ message: '', description: '请求异常' })
      error.message.search('50') > -1 && notification.error({ message: '', description: '服务异常' })
      error.message === 'Network Error' && notification.error({ message: '', description: '网络异常' })
    } else {
      notification.error({ message: '', description: '服务异常，请稍后重试' })
    }
    return Promise.reject(error)
  }
)

// axios.interceptors.response.use(undefined, (error) => {
//   console.log(error)
//   return Promise.reject(error)
// })

export default axios

function CodeError(data) {
  this.name = 'LogicalError'
  this.code = data?.code
  this.data = data?.data
  this.message = data?.message
}
