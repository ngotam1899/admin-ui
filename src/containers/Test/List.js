/*
 * Copyright © 2022 ICON Clinical Research Ltd.
 * All rights reserved.
 */
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
import TestActions from '../../redux/actions/test'
import Pagination from 'react-js-pagination'
import getFilterParams from '../../util/getFilterParams'
import qs from 'query-string'

function List(props) {
  const [filter, setFilter] = useState({
    PageNumber: 1,
    PageSize: 10,
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const tests = useSelector((state) => state.test.list || [])
  const total = useSelector((state) => state.test.total || 0)

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
    dispatch(TestActions.onGetList(params))
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

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-6">
                <h5 className="my-2">List of Test</h5>
                <p className="float-left my-2 mr-3 font-italic">
                  Có tất cả {total} kết quả tìm kiếm
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
                  Add a Test
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="xxl">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Test ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tests.length > 0 &&
                  tests.map((item) => {
                    return (
                      <CTableRow key={item.id}>
                        <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                        <CTableDataCell>{item.testDescript}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => this.onUpdate(!large, item.id)}
                            className="mr-1 mb-1 mb-xl-0"
                            color="warning"
                          >
                            Sửa
                          </CButton>
                          <CButton
                            onClick={() => this.onSubmit(item.id, 'xóa', null)}
                            className="mr-1"
                            color="danger"
                          >
                            Xóa
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
            {/* {adDetail && large && (
                <AdDetail
                  large={large}
                  ad={adDetail}
                  onClose={this.onClose}
                  onClearDetail={onClearDetail}
                  queryParams={queryParams}
                />
              )}
              {!adDetail && large && (
                <AdDetail
                  large={large}
                  onClose={this.onClose}
                  onClearDetail={onClearDetail}
                  queryParams={queryParams}
                />
              )} */}
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
