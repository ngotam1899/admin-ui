import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
} from '@coreui/react'
import UserActions from '../../redux/actions/user'
import CollegeActions from '../../redux/actions/college'
import Detail from './Detail'
import Connector from './Connector'

function List(props) {
  const [large, setLarge] = useState(false)
  const [_large, set_Large] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const colleges = useSelector((state) => state.college.list || [])
  const user = useSelector((state) => state.user.list || [])
  const detail = useSelector((state) => state.user.detail || {})

  useEffect(() => {
    loadData()
  }, [location])

  const loadData = () => {
    dispatch(UserActions.onGetList())
    dispatch(
      CollegeActions.onGetList({
        PageNumber: 1,
        PageSize: 200,
      }),
    )
  }

  const onUpdate = (large, id) => {
    setLarge(large)
    dispatch(UserActions.onGetDetail(id))
  }

  const onChangeStatus = (userId, enbDisable) => {
    dispatch(
      UserActions.onUpdate({
        data: {
          userId,
          enbDisable,
        },
      }),
    )
  }

  const onAddConnector = () => {
    set_Large(true);
  }

  const onClose = (large) => {
    setLarge(large)
    set_Large(large)
    dispatch(UserActions.onClearDetail())
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-12">
                <h5 className="my-2">List of System User</h5>
                <p className="float-left my-2 mr-3 font-italic">
                  Có tất cả {user.length} kết quả tìm kiếm
                </p>
                <CButton
                  onClick={() => onAddConnector()}
                  color="success"
                >
                  Add a Connector
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="xxl">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">User ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {user.length > 0 &&
                  user.map((item) => {
                    return (
                      <CTableRow key={item.userId}>
                        <CTableHeaderCell scope="row">{item.userId}</CTableHeaderCell>
                        <CTableDataCell>
                          <CAvatar src={item.imagePath} className="float-start me-2" />
                          <p>{item.userName}</p>
                        </CTableDataCell>
                        <CTableDataCell>{item.email}</CTableDataCell>
                        <CTableDataCell>
                          {item.roleName === 'Admin' ? (
                            <CBadge color="primary">{item.roleName.toUpperCase()}</CBadge>
                          ) : (item.roleName === 'Student' ? (
                            <CBadge color="info">{item.roleName.toUpperCase()}</CBadge>
                          ) : (
                            <CBadge color="success">{item.roleName.toUpperCase()}</CBadge>
                          ))}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.isLocked ? (
                            <CBadge color="danger">LOCKED</CBadge>
                          ) : (
                            <CBadge color="success">ACTIVE</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => onUpdate(!large, item.userId)}
                            className="mr-1 mb-1 mb-xl-0"
                            color="warning"
                          >
                            View
                          </CButton>{' '}
                          <CButton
                            onClick={() => onChangeStatus(item.userId, !item.isLocked)}
                            className="mr-1"
                            color={item.isLocked ? 'danger' : 'success'}
                          >
                            {item.isLocked ? 'Disable' : 'Active'}
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
            {detail && large && (
              <Detail
                large={large}
                detail={detail}
                onClose={onClose}
                onClearDetail={UserActions.onClearDetail} colleges={colleges}
              />
            )}
            {!detail && large && (
              <Detail large={large} onClose={onClose} onClearDetail={UserActions.onClearDetail} colleges={colleges}/>
            )}
            {_large && colleges && (
              <Connector large={_large} onClose={onClose} colleges={colleges}/>
              )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
