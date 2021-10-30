// import qs from 'qs'
import axios from 'axios'
import { notification } from 'antd'

axios.defaults.baseURL = '/api-v1'

axios.defaults.timeout = 60000

// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded;charset=UTF-8'

// data is only applicable for request methods 'PUT', 'POST', and 'PATCH'
// axios.defaults.transformRequest = (data, header) => qs.stringify(data)

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
    const { data } = response

    if (data?.code === 200) return data.data
    if (data?.message) notification.error({ description: '服务异常，请稍后重试' })

    return Promise.reject(new CodeError(data))
  },

  (error) => {
    console.log('ERR', error)

    if (axios.isCancel(error)) return Promise.reject(error)

    if (error.message) {
      error.message.search('timeout') > -1 && notification.error({ description: '请求超时' })
      error.message.search('404') > -1 && notification.error({ description: '资源不存在' })
      error.message.search('400') > -1 && notification.error({ description: '请求异常' })
      error.message.search('50') > -1 && notification.error({ description: '服务异常' })
      error.message === 'Network Error' && notification.error({ description: '网络异常' })
    } else {
      notification.error({ description: '服务异常，请稍后重试' })
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
