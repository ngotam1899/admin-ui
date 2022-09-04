import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
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
  CCardFooter,
  CButton,
  CRow,
} from '@coreui/react'
import MajorActions from '../../redux/actions/major'
import Detail from './Detail'
import Pagination from 'react-js-pagination'
import getFilterParams from '../../util/getFilterParams'
import qs from 'query-string'

function List(props) {
  const [large, setLarge] = useState(false)
  const [filter, setFilter] = useState({
    PageNumber: 1,
    PageSize: 10,
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const major = useSelector((state) => state.major.list || [])
  const total = useSelector((state) => state.major.total || [])
  const detail = useSelector((state) => state.major.detail || {})

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
    dispatch(MajorActions.onGetList(params))
  }
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
              <div className="col-12">
                <h5 className="my-2">List of Major</h5>
                <p className="float-left my-2 mr-3 font-italic">
                  Có tất cả {total} kết quả tìm kiếm
                </p>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="xxl">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Major ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {major.length > 0 &&
                  major.map((item) => {
                    return (
                      <CTableRow key={item.majorId}>
                        <CTableHeaderCell scope="row">{item.majorId}</CTableHeaderCell>
                        <CTableDataCell>
                          <p>{item.majorName}</p>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => onUpdate(!large, item.majorId)}
                            className="mr-1 mb-1 mb-xl-0"
                            color="warning"
                            disabled
                          >
                            Update
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
                onClearDetail={UserActions.onClearDetail}
              />
            )}
            {!detail && large && (
              <Detail large={large} onClose={onClose} onClearDetail={UserActions.onClearDetail} />
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
