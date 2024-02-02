import { base_url } from '../utils/base_url'
import { toast } from 'react-toastify'
import axiosConfig from '../utils/axiosconfig'

const getAllUser = async (user) => {
  try {
    let response
    if (user === 'admin') {
      response = await axiosConfig.get(`${base_url}auth?role=${user}`)
    } else if (user === 'user') {
      response = await axiosConfig.get(`${base_url}auth?role=${user}`)
    }

    if (response.status === 200) {
      return response.data.users
    } else {
      // Xử lý lỗi ở đây nếu cần
      console.error('Error fetching data:', response.statusText)
      throw new Error('Failed to fetch data')
    }
  } catch (error) {
    // Xử lý lỗi của axios hoặc bất kỳ lỗi nào khác
    console.error('Error:', error.message)
    throw new Error('Failed to fetch data')
  }
}

const deleteUser = async (id) => {
  const response = await axiosConfig.delete(`${base_url}auth/${id}`)

  if (response.status === 200) {
    toast.success('Xóa người dùng thành công!')
  }
}

export const authApis = {
  getAllUser,
  deleteUser
}
