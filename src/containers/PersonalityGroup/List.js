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
import PGActions from '../../redux/actions/personalityGroup'
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
  const pgs = useSelector((state) => state.personalityGroup.list || [])
  const total = useSelector((state) => state.personalityGroup.total || 0)
  const detail = useSelector((state) => state.personalityGroup.detail || {})

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
    dispatch(PGActions.onGetList(params))
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
    dispatch(PGActions.onGetDetail(id))
  }

  const onClose = (large) => {
    setLarge(large)
    dispatch(PGActions.onClearDetail())
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-12">
                <h5 className="my-2">List of Personality Group</h5>
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
                  <CTableHeaderCell scope="col">Group ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Group Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Test Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pgs.length > 0 &&
                  pgs.map((item) => {
                    return (
                      <CTableRow key={item.personalityGroupId}>
                        <CTableHeaderCell scope="row">{item.personalityGroupId}</CTableHeaderCell>
                        <CTableDataCell>{item.personalityGroupName}</CTableDataCell>
                        <CTableDataCell>{item.testTypeId}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => onUpdate(!large, item.personalityGroupId)}
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
                onClearDetail={PGActions.onClearDetail}
                filter={filter}
              />
            )}
            {!detail && large && (
              <Detail
                large={large}
                onClose={onClose}
                onClearDetail={PGActions.onClearDetail}
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
