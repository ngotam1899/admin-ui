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
import AnswerActions from '../../redux/actions/answer'
import TestActions from '../../redux/actions/test'
import QuestionActions from '../../redux/actions/question'
import Pagination from 'react-js-pagination'
import getFilterParams from '../../util/getFilterParams'
import qs from 'query-string'
import Detail from './Detail'
import AnswerList from './AnswerList'

function List(props) {
  const [filter, setFilter] = useState({
    PageNumber: 1,
    PageSize: 10,
  })
  const [large, setLarge] = useState(false)
  const [modalType, setModalType] = useState('EDIT')
  const [activeKey, setActiveKey] = useState(1)
  const [questionId, setQuestionId] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const question = useSelector((state) => state.question.list || [])
  const detail = useSelector((state) => state.question.detail || null)
  const answer = useSelector((state) => state.answer.list || [])
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
    activeKey !== 1 && dispatch(QuestionActions.onGetList({ test_id: activeKey, params }))
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

  const onClose = (large) => {
    setLarge(large)
    dispatch(QuestionActions.onClearDetail())
    dispatch(AnswerActions.onClearState())
  }

  const onUpdate = (large, id) => {
    setLarge(large)
    setModalType('EDIT')
    dispatch(QuestionActions.onGetDetail(id))
  }

  const onViewAnswer = (large, id) => {
    setLarge(large)
    setQuestionId(id)
    setModalType('VIEW_ANSWER')
    dispatch(AnswerActions.onGetList(id))
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-12">
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
                  onClick={() => setLarge(!large)}
                  color="success"
                >
                  Add a Question
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
                                      onClick={() => onUpdate(!large, item.questionId)}
                                      className="mr-1 mb-1 mb-xl-0"
                                      color="warning"
                                    >
                                      Edit
                                    </CButton>
                                    <CButton
                                      onClick={() => onViewAnswer(!large, item.questionId)}
                                      className="mr-1"
                                      color="info"
                                    >
                                      View Answer
                                    </CButton>
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

            {detail && modalType === 'EDIT' && large && (
              <Detail
                large={large}
                detail={detail}
                onClose={onClose}
                onClearDetail={QuestionActions.onClearDetail}
                filter={filter}
                test_id={activeKey}
              />
            )}
            {!detail && modalType === 'EDIT' && large && (
              <Detail
                large={large}
                onClose={onClose}
                onClearDetail={QuestionActions.onClearDetail}
                filter={filter}
                test_id={activeKey}
              />
            )}
            {answer && modalType === 'VIEW_ANSWER' && large && (
              <AnswerList
                answer={answer}
                large={large}
                onClose={onClose}
                onClearDetail={QuestionActions.onClearDetail}
                question_id={questionId}
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
