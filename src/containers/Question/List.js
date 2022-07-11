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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import PGActions from '../../redux/actions/personalityGroup'
import TestActions from '../../redux/actions/test'
import QuestionActions from '../../redux/actions/question'
import Pagination from 'react-js-pagination'
import getFilterParams from '../../util/getFilterParams'
import qs from 'query-string'

function List(props) {
  const [filter, setFilter] = useState({
    PageNumber: 1,
    PageSize: 10,
  })
  const [activeKey, setActiveKey] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const question = useSelector((state) => state.question.list || [])
  const type = useSelector((state) => state.test.type || [])
  const total = useSelector((state) => state.question.total || 0)

  useEffect(() => {
    loadData()
  }, [location])

  useEffect(() => {
    const filters = getFilterParams(location.search)
    var params = {
      ...filter,
      ...filters,
    }
    dispatch(QuestionActions.onClearState())
    dispatch(QuestionActions.onGetList({ test_id: activeKey, params }))
  }, [activeKey])

  const loadData = () => {
    const filters = getFilterParams(location.search)
    var params = {
      ...filter,
      ...filters,
    }
    setFilter(params)
    dispatch(QuestionActions.onClearState())
    dispatch(PGActions.onGetList(params))
    dispatch(QuestionActions.onGetList({ test_id: activeKey, params }))
    dispatch(TestActions.onGetType())
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
                <h5 className="my-2">List of Question</h5>
                <CNav variant="pills" role="tablist">
                  {type &&
                    type.map((item, index) => {
                      return (
                        <CNavItem key={index}>
                          <CNavLink
                            href="#"
                            active={activeKey === item.id}
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveKey(item.id)
                            }}
                          >
                            {item.name}
                          </CNavLink>
                        </CNavItem>
                      )
                    })}
                </CNav>
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
                  Add a Personality Group
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTabContent>
              {type &&
                type.map((item, index) => {
                  return (
                    <CTabPane key={index} role="tabpanel" visible={activeKey === item.id}>
                      <CTable responsive="xxl">
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Question ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Content</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Order</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {question.length > 0 &&
                            question.map((item) => {
                              return (
                                <CTableRow key={item.questionId}>
                                  <CTableHeaderCell scope="row">{item.questionId}</CTableHeaderCell>
                                  <CTableDataCell>{item.questionContent}</CTableDataCell>
                                  <CTableDataCell>{item.orderIndex}</CTableDataCell>
                                  <CTableDataCell>
                                    <CButton
                                      onClick={() => this.onUpdate(!large, item._id)}
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
                    </CTabPane>
                  )
                })}
            </CTabContent>

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
