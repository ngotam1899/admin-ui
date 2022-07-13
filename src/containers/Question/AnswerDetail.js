import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import AnswerActions from '../../redux/actions/answer'

function AnswerDetail(props) {
  const { modal, detail, question_id, onCloseModal, onClearDetail } = props
  const [inputField, setInputField] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(detail)
    setInputField({
      answerContent: detail && detail.answerContent,
      orderIndex: detail && detail.orderIndex,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value,
    })
  }

  const onSubmit = () => {
    if (detail) {
      dispatch(
        AnswerActions.onUpdate({
          answer_id: detail.answerId,
          question_id: question_id,
          data: inputField,
        }),
      )
    } else {
      dispatch(
        AnswerActions.onCreate({
          question_id: question_id,
          data: inputField,
        }),
      )
    }
  }

  return (
    <CModal visible={modal} onClose={() => onCloseModal(!modal)} size="lg" alignment="center">
      <CModalHeader closeButton>
        <CModalTitle>{detail ? 'Edit an Answer' : 'Add new Answer'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2">
                    <CFormLabel htmlFor="answerContent">Answer Content</CFormLabel>
                    <CFormTextarea
                      id="answerContent"
                      rows="3"
                      value={inputField.answerContent || ''}
                      onChange={inputsHandler}
                      name="answerContent"
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="orderIndex">Order</CFormLabel>
                    <CFormInput
                      type="number"
                      name="orderIndex"
                      id="orderIndex"
                      value={inputField.orderIndex || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>
              </div>
            </CForm>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => onSubmit(!modal)}>
          Save
        </CButton>{' '}
        <CButton color="secondary" onClick={() => onCloseModal(!modal)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AnswerDetail
