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

// https://release-mto.herokuapp.com/api/sys_users  METHOD = PUT
export const updateUser = (data) => {
  return axiosService.put(`${ENDPOINT}${url}`, data)
}

// https://release-mto.herokuapp.com/api/sys_users/:account_id/role/:role_id  METHOD = PUT
export const updateRoleUser = (account_id, role_id, college_id) => {
  return axiosService.put(`${ENDPOINT}${url}/${account_id}/role/${role_id}/${college_id}`)
}

// https://release-mto.herokuapp.com/api/sys_users/Connector  METHOD = POST
export const createConnector = (data) => {
  return axiosService.post(`${ENDPOINT}${url}/Connector`, data)
}
