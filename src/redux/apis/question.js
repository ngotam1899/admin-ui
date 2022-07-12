//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'
import queryString from 'query-string'

// https://release-mto.herokuapp.com/api/questions/{test_id}  METHOD = GET
const url = '/questions'

export const getQuestionByTestID = (test_id, params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}/${test_id}${queryParams}`)
}

// https://release-mto.herokuapp.com/api/questions/{test_id}  METHOD = POST
export const addQuestionByTestID = (test_id, data) => {
  return axiosService.post(`${ENDPOINT}${url}/${test_id}`, data)
}
