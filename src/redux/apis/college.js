//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'
import queryString from 'query-string'

// https://release-mto.herokuapp.com/api/colleges  METHOD = GET
const url = '/colleges'

export const getAllColleges = (params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}${queryParams}`)
}

// https://release-mto.herokuapp.com/api/colleges/:colleges_id/detail   METHOD = GET
export const getDetailCollege = (colleges_id) => {
  return axiosService.get(`${ENDPOINT}${url}/${colleges_id}/detail`)
}

// https://release-mto.herokuapp.com/api/colleges  METHOD = POST
export const addCollege = (data) => {
  return axiosService.post(`${ENDPOINT}${url}`, data)
}

// https://release-mto.herokuapp.com/api/colleges  METHOD = PUT
export const updateCollege = (data) => {
  return axiosService.put(`${ENDPOINT}${url}`, data)
}

// https://release-mto.herokuapp.com/api/colleges/Point  METHOD = PUT
export const updateSubjectPoint = (data) => {
  return axiosService.put(`${ENDPOINT}${url}/Point`, data)
}

// https://release-mto.herokuapp.com/api/colleges/:colleges_id/major/:majorId  METHOD = POST
export const addMajor = (colleges_id, majorId) => {
  return axiosService.post(`${ENDPOINT}${url}/${colleges_id}/major/${majorId}`)
}

// https://release-mto.herokuapp.com/api/colleges/:colleges_id/major/:majorId  METHOD = DELETE
export const removeMajor = (colleges_id, majorId) => {
  return axiosService.delete(`${ENDPOINT}${url}/${colleges_id}/major/${majorId}`)
}

// https://release-mto.herokuapp.com/api/majors/statistic  METHOD = GET
export const statisticCollege = (params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}/statistic${queryParams}`)
}