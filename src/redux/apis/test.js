/*
 * Copyright © 2022 ICON Clinical Research Ltd.
 * All rights reserved.
 */
//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'
import queryString from 'query-string'

// https://release-mto.herokuapp.com/api/tests/All  METHOD = GET
const url = '/tests'

export const getAllTest = (params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}/All${queryParams}`)
}

// https://release-mto.herokuapp.com/api/tests/type METHOD = GET
export const getAllType = () => {
  return axiosService.get(`${ENDPOINT}${url}/type`)
}

// https://release-mto.herokuapp.com/api/tests/:test_id   METHOD = GET
export const getDetailTest = (test_id) => {
  return axiosService.get(`${ENDPOINT}${url}/${test_id}`)
}

// https://release-mto.herokuapp.com/api/tests  METHOD = POST
export const addTest = (data) => {
  return axiosService.post(`${ENDPOINT}${url}`, data)
}

// https://release-mto.herokuapp.com/api/tests/:test_id  METHOD = PUT
export const updateTest = (data, test_id) => {
  return axiosService.put(`${ENDPOINT}${url}/${test_id}`, data)
}

// https://release-mto.herokuapp.com/api/tests/:test_id  METHOD = DELETE
export const deleteTest = (test_id) => {
  return axiosService.delete(`${ENDPOINT}${url}/${test_id}`)
}
