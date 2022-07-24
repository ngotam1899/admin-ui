import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
} from '@coreui/react'
import AuthorizationActions from '../../redux/actions/auth'
import { useDispatch } from 'react-redux'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    localStorage.removeItem("AUTH_USER");
    dispatch(AuthorizationActions.onLogout())
    navigate(`/#/login`)
  }

  return (
    <CButton
      className="ml-2 float-left"
      onClick={() => onLogout()}
      color="primary"
    >
      Logout
    </CButton>
  )
}

export default AppHeaderDropdown
