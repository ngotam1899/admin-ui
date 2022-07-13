//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../util/AxiosService'
import { ENDPOINT } from '../../constants/index'
import queryString from 'query-string'

// https://release-mto.herokuapp.com/api/answers/question/{question_id}  METHOD = GET
const url = '/answers'

export const getAllAnswersByQuestionID = (question_id, params = {}) => {
  let queryParams = ''
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`
  }
  return axiosService.get(`${ENDPOINT}${url}/question/${question_id}${queryParams}`)
}

// https://release-mto.herokuapp.com/api/answers/{answer_id}/detail   METHOD = GET
export const getDetailAnswer = (answer_id) => {
  return axiosService.get(`${ENDPOINT}${url}/${answer_id}/detail`)
}

// https://release-mto.herokuapp.com/api/answers/question/{question_id}  METHOD = POST
export const addAnswerByQuestionID = (question_id, data) => {
  return axiosService.post(`${ENDPOINT}${url}/question/${question_id}`, data)
}

// https://release-mto.herokuapp.com/api/answers/{answer_id}  METHOD = PUT
export const updateAnswer = (answer_id, data) => {
  return axiosService.put(`${ENDPOINT}${url}/${answer_id}`, data)
}

// https://release-mto.herokuapp.com/api/personality_groups/:pgroup_id  METHOD = DELETE
export const deletePersonalityGroup = (pgroup_id) => {
  return axiosService.delete(`${ENDPOINT}${url}/${pgroup_id}`)
}
