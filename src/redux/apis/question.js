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

// https://release-mto.herokuapp.com/api/questions/{question_id}/detail   METHOD = GET
export const getDetailQuestion = (question_id) => {
  return axiosService.get(`${ENDPOINT}${url}/${question_id}/detail`)
}

// https://release-mto.herokuapp.com/api/questions/{test_id}  METHOD = POST
export const addQuestionByTestID = (test_id, data) => {
  return axiosService.post(`${ENDPOINT}${url}/${test_id}`, data)
}

// https://release-mto.herokuapp.com/api/questions/{question_id}  METHOD = PUT
export const updateQuestion = (question_id, data) => {
  return axiosService.put(`${ENDPOINT}${url}/${question_id}`, data)
}
