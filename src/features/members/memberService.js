import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getUsers = async () => {
  const response = await axios.get(`${base_url}auth/user`)

  if (response.status === 200) {
    return response.data
  }
}

const getAdmins = async () => {
  const response = await axios.get(`${base_url}auth/admin`)

  if (response.status === 200) {
    return response.data
  }
}

const getMembers = async () => {
  const response = await axios.get(`${base_url}member`)

  if (response.status === 200) {
    return response.data
  }
}

const getMember = async (id) => {
  const response = await axios.get(`${base_url}member/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createMember = async (memberData) => {
  const response = await axios.post(`${base_url}member`, memberData)

  if (response.status === 200) {
    return response.data
  }
}

const updateMember = async (id, memberData) => {
  const response = await axios.put(`${base_url}member/${id}`, memberData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteMember = async (id) => {
  const response = await axios.delete(`${base_url}member/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

export const memberService = {
  getUsers,
  getAdmins,
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
}
