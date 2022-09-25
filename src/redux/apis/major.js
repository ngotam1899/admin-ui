//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'
import queryString from 'query-string'

// https://release-mto.herokuapp.com/api/majors  METHOD = GET
const url = '/majors'

export const getAllMajor = (params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}${queryParams}`)
}

// https://release-mto.herokuapp.com/api/majors/statistic  METHOD = GET
export const statisticMajor = (params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}/statistic${queryParams}`)
}

// https://release-mto.herokuapp.com/api/majors  METHOD = POST
export const addMajor = (data) => {
  console.log(data)
  return axiosService.post(`${ENDPOINT}${url}`, data)
}
