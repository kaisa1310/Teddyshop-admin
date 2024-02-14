import { base_url } from '../utils/base_url'
import { toast } from 'react-toastify'
import axiosConfig from '../utils/axiosconfig'

const deleteUser = async (id) => {
  const response = await axiosConfig.delete(`${base_url}auth/${id}`)

  if (response.status === 200) {
    toast.success('Xóa người dùng thành công!')
  }
}

export const authApis = {
  deleteUser
}
