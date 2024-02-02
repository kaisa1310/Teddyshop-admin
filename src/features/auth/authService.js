import axios from 'axios'
import { base_url } from '../../utils/base_url'

const login = async (userData) => {
  const response = await axios.post(`${base_url}auth/login-admin`, userData)
  if (response.data) {
    localStorage.setItem('user_data', JSON.stringify(response.data))
  }
  return response
}

export const authSerice = {
  login
}
