import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
} from '@coreui/react'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.removeItem("AUTH_USER");
    navigate(`login`)
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
