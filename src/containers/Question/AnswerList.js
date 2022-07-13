import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import AnswerActions from '../../redux/actions/answer'
import AnswerDetail from './AnswerDetail'

function AnswerList(props) {
  const { large, answer, onClose, onClearDetail, question_id } = props
  const detail = useSelector((state) => state.answer.detail || null)

  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  const onUpdate = (modal, id) => {
    setModal(!modal)
    dispatch(AnswerActions.onGetDetail(id))
  }

  const onCloseModal = (modal) => {
    setModal(modal)
    dispatch(AnswerActions.onClearDetail())
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="xl" alignment="center">
      <CModalHeader closeButton>
        <CModalTitle>View Answer</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CButton onClick={() => setModal(!modal)} className="mb-1 float-right" color="success">
          {' '}
          Add an Answer
        </CButton>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <CTable responsive="xxl">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Content</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Order</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {answer &&
                      answer.length > 0 &&
                      answer.map((item) => {
                        return (
                          <CTableRow key={item.answerId}>
                            <CTableDataCell>{item.answerContent}</CTableDataCell>
                            <CTableDataCell>{item.orderIndex}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                onClick={() => onUpdate(!large, item.answerId)}
                                className="mr-1 mb-1 mb-xl-0"
                                color="warning"
                              >
                                Edit
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          </div>
        </div>
        {detail && modal && (
          <AnswerDetail
            modal={modal}
            detail={detail}
            question_id={question_id}
            onCloseModal={onCloseModal}
          />
        )}
        {!detail && modal && (
          <AnswerDetail modal={modal} question_id={question_id} onCloseModal={onCloseModal} />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => onClose(!large)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AnswerList
