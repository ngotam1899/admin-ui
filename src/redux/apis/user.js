/*
 * Copyright © 2022 ICON Clinical Research Ltd.
 * All rights reserved.
 */
//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'
import queryString from 'query-string'

const url = '/sys_users'

// https://release-mto.herokuapp.com/api/sys_users METHOD = GET
export const getAllUser = () => {
  return axiosService.get(`${ENDPOINT}${url}`)
}

// https://release-mto.herokuapp.com/api/sys_users/user_id/detail   METHOD = GET
export const getDetailUser = (user_id) => {
  return axiosService.get(`${ENDPOINT}${url}/${user_id}/detail`)
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