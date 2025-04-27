import axios from 'axios'

const useHttp = () => {
  const axiosInstance = axios.create({
    baseURL: `${window.location.origin}/api/v1`,
    timeout: 5000
  })

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么，例如添加 token
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response) => {
      // 对响应数据做些什么
      return response
    },
    (error) => {
      // 对响应错误做些什么
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export { useHttp }
