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

// https://release-mto.herokuapp.com/api/personality_groups/:pgroup_id  METHOD = PUT
export const updatePersonalityGroup = (data, pgroup_id) => {
  return axiosService.put(`${ENDPOINT}${url}/${pgroup_id}`, data)
}

// https://release-mto.herokuapp.com/api/personality_groups/:pgroup_id  METHOD = DELETE
export const deletePersonalityGroup = (pgroup_id) => {
  return axiosService.delete(`${ENDPOINT}${url}/${pgroup_id}`)
}
