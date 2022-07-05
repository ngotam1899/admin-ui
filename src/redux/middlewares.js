import axiosService from '../util/AxiosService'

export default function createApiAuthMiddle({ dispatch, getState }) {
  return (next) => (action) => {
    const authToken = localStorage.getItem('AUTH_USER')
    axiosService.changeHeaders({
      Authorization: 'Bearer ' + authToken,
    })
    return next(action)
  }
}
