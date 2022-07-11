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
import PGActions from '../../redux/actions/personalityGroup'
import UserActions from '../../redux/actions/user'
import Detail from './Detail'

function List(props) {
  const navigate = useNavigate()
  const [large, setLarge] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.list || [])
  const detail = useSelector((state) => state.user.detail || {})

  useEffect(() => {
    loadData()
  }, [location])

  const loadData = () => {
    dispatch(UserActions.onGetList())
  }

  const onUpdate = (large, id) => {
    setLarge(large)
    dispatch(UserActions.onGetDetail(id))
  }

  const onClose = (large) => {
    setLarge(large)
    dispatch(UserActions.onClearDetail())
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-6">
                <h5 className="my-2">List of Personality Group</h5>
                <p className="float-left my-2 mr-3 font-italic">
                  Có tất cả {user.length} kết quả tìm kiếm
                </p>
                <CButton
                  className="ml-2 float-left"
                  onClick={() => this.destroyFilter()}
                  color="info"
                >
                  {' '}
                  <i className="fa fa-eraser mr-1"></i>
                  Xóa tất cả bộ lọc
                </CButton>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                >
                  {' '}
                  Add a Personality Group
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
                          {item.roleName === 'admin' ? (
                            <CBadge color="primary">{item.roleName.toUpperCase()}</CBadge>
                          ) : (
                            <CBadge color="info">{item.roleName.toUpperCase()}</CBadge>
                          )}
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
                            Sửa
                          </CButton>
                          {/* <CButton
                            onClick={() => this.onSubmit(item._id, 'xóa', null)}
                            className="mr-1"
                            color="danger"
                          >
                            Xóa
                          </CButton> */}
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
                onClearDetail={UserActions.onClearDetail}
              />
            )}
            {!detail && large && (
              <Detail
                large={large}
                onClose={this.onClose}
                onClearDetail={UserActions.onClearDetail}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
