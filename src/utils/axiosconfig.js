import axios from 'axios'

const axiosConfig = axios.create()

axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')).token : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers.Accept = 'application/json'

  return config
})

export default axiosConfig
