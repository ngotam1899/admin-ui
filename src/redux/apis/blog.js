//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'
import queryString from 'query-string'

// https://release-mto.herokuapp.com/api/blogs  METHOD = GET
const url = '/blogs'

export const getAllBlogs = (params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}${queryParams}`)
}

// https://release-mto.herokuapp.com/api/blogs/:blogs_id/detail   METHOD = GET
export const getDetailBlog = (blogs_id) => {
  return axiosService.get(`${ENDPOINT}${url}/${blogs_id}/detail`)
}

// https://release-mto.herokuapp.com/api/blogs  METHOD = POST
export const addBlog = (data) => {
  return axiosService.post(`${ENDPOINT}${url}`, data)
}

// https://release-mto.herokuapp.com/api/blogs  METHOD = PUT
export const updateBlog = (data, blog_id) => {
  return axiosService.put(`${ENDPOINT}${url}/${blog_id}`, data)
}
