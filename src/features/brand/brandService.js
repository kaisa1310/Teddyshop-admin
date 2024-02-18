import axios from '../../utils/axiosconfig'
import { base_url } from '../../utils/base_url'

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand`)

  if (response.status === 200) {
    return response.data
  }
}

const getBrandById = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

const createBrand = async (procatData) => {
  const response = await axios.post(`${base_url}brand/`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const updateBrand = async (id, procatData) => {
  const response = await axios.put(`${base_url}brand/${id}`, procatData)

  if (response.status === 200) {
    return response.data
  }
}

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`)

  if (response.status === 200) {
    return response.data
  }
}

export const brandService = {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
}
