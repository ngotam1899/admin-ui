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
import CollegeActions from '../../redux/actions/college'
import MajorActions from '../../redux/actions/major'
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
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const colleges = useSelector((state) => state.college.list || [])
  const majors = useSelector((state) => state.major.list || [])
  const total = useSelector((state) => state.college.total || 0)
  const detail = useSelector((state) => state.college.detail || null)

  useEffect(() => {
    loadData()
  }, [location])

  const loadData = () => {
    const filters = getFilterParams(location.search)
    var params = {
      ...filter,
      ...filters,
    }
    setFilter(params)
    dispatch(CollegeActions.onGetList(params))
    dispatch(
      MajorActions.onGetList({
        PageNumber: 1,
        PageSize: 200,
      }),
    )
  }

  // phân trang
  const handlePageChange = (PageNumber) => {
    handleUpdateFilter({ PageNumber })
  }
  const handleUpdateFilter = (data) => {
    const { pathname, search } = location
    let queryParams = getFilterParams(search)
    queryParams = {
      ...queryParams,
      ...data,
    }
    setFilter(queryParams)
    navigate(`${pathname}?${qs.stringify(queryParams)}`)
  }

  const onUpdate = (large, id) => {
    setLarge(large)
    dispatch(CollegeActions.onGetDetail(id))
  }

  const onClose = (large) => {
    setLarge(large)
    dispatch(CollegeActions.onClearDetail())
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-12">
                <h5 className="my-2">List of College</h5>
                <p className="float-left my-2 mr-3 font-italic">
                  Có tất cả {total} kết quả tìm kiếm
                </p>
                <CButton onClick={() => setLarge(!large)} color="success">
                  Add a College
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="xxl">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Link</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {colleges.length > 0 &&
                  colleges.map((item) => {
                    return (
                      <CTableRow key={item.collegeId}>
                        <CTableHeaderCell scope="row">{item.collegeId}</CTableHeaderCell>
                        <CTableDataCell>{item.collegeName}</CTableDataCell>
                        <CTableDataCell>
                          <img style={{ width: '5vw' }} src={item.imagePath} alt="" />
                        </CTableDataCell>
                        <CTableDataCell>{item.referenceLink}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => onUpdate(!large, item.collegeId)}
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
                majors={majors}
                onClose={onClose}
                onClearDetail={CollegeActions.onClearDetail}
                filter={filter}
              />
            )}
            {!detail && large && (
              <Detail
                large={large}
                onClose={onClose}
                majors={majors}
                onClearDetail={CollegeActions.onClearDetail}
                filter={filter}
              />
            )}
          </CCardBody>
          <CCardFooter>
            {total && total > 10 && (
              <Pagination
                activePage={+filter.PageNumber}
                itemsCountPerPage={filter.PageSize}
                totalItemsCount={total}
                pageRangeDisplayed={3}
                linkClass="page-link"
                itemClass="page-item"
                prevPageText="Previous"
                nextPageText="Next"
                hideFirstLastPages={true}
                onChange={handlePageChange.bind(this)}
              />
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
