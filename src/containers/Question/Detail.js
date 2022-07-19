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
import QuestionActions from '../../redux/actions/question'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter, test_id } = props
  const [inputField, setInputField] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    setInputField({
      questionContent: detail && detail.questionContent,
      orderIndex: detail && detail.orderIndex,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value,
    })
  }

  const onSubmit = (large) => {
    onClose(large)
    if (detail) {
      dispatch(
        QuestionActions.onUpdate({
          test_id: test_id,
          question_id: detail.questionId,
          data: inputField,
          params: filter,
        }),
      )
    } else {
      dispatch(
        QuestionActions.onCreate({
          test_id: test_id,
          data: inputField,
          params: filter,
        }),
      )
    }
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{detail ? 'Edit a question' : 'Add new question'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2">
                    <CFormLabel htmlFor="questionContent">Question Content</CFormLabel>
                    <CFormTextarea
                      id="questionContent"
                      rows="3"
                      value={inputField.questionContent || ''}
                      onChange={inputsHandler}
                      name="questionContent"
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
        <CButton color="primary" onClick={() => onSubmit(!large)}>
          Save
        </CButton>{' '}
        <CButton color="secondary" onClick={() => onClose(!large)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default Detail
