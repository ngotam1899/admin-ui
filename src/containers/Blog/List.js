import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
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
import BlogActions from '../../redux/actions/blog'
import Pagination from 'react-js-pagination'
import getFilterParams from '../../util/getFilterParams'
import qs from 'query-string'
import Detail from './Detail'

function List(props) {
  const [large, setLarge] = useState(false)
  const [filter, setFilter] = useState({
    PageNumber: 1,
    PageSize: 10,
  })
  const location = useLocation()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog.list || [])
  const total = useSelector((state) => state.blog.total || 0)
  const detail = useSelector((state) => state.blog.detail || null)

  useEffect(() => {
    loadData()
  }, [location])

  const loadData = () => {
    dispatch(BlogActions.onGetList())
  }

  const onUpdate = (large, id) => {
    console.log(id)
    setLarge(large)
    dispatch(BlogActions.onGetDetail(id))
  }

  const onClose = (large) => {
    setLarge(large)
    dispatch(BlogActions.onClearDetail())
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-12">
                <h5 className="my-2">List of Blog</h5>
                <p className="float-left my-2 mr-3 font-italic">
                  Có tất cả {total} kết quả tìm kiếm
                </p>
                <CButton onClick={() => setLarge(!large)} color="success">
                  Add a Blog
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="xxl">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {blogs.length > 0 &&
                  blogs.map((item) => {
                    return (
                      <CTableRow key={item.id}>
                        <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>
                          <img style={{ width: '5vw' }} src={item.image} alt="" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => onUpdate(!large, item.id)}
                            className="mr-1 mb-1 mb-xl-0"
                            color="warning"
                          >
                            Edit
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
                onClearDetail={BlogActions.onClearDetail}
                filter={filter}
              />
            )}
            {!detail && large && (
              <Detail
                large={large}
                onClose={onClose}
                onClearDetail={BlogActions.onClearDetail}
                filter={filter}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
