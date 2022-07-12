//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'

const url = '/sys_users'
// 1. Đăng nhập tài khoản tại {{url}}/sys_users/admin_login
export const loginAccount = (data) => {
  return axiosService.post(`${ENDPOINT}${url}/admin_login`, data)
}
