import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import AnswerActions from '../../redux/actions/answer'
import PGActions from '../../redux/actions/personalityGroup'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

function AnswerDetail(props) {
  const { modal, detail, question_id, onCloseModal, onClearDetail } = props
  const pgs = useSelector((state) => state.personalityGroup.list || [])
  const [inputField, setInputField] = useState({})
  const dispatch = useDispatch()
  const animatedComponents = makeAnimated()

  useEffect(() => {
    dispatch(
      PGActions.onGetList({
        PageNumber: 1,
        PageSize: 25,
      }),
    )
  }, [])

  useEffect(() => {
    setInputField({
      answerContent: detail && detail.answer.answerContent,
      orderIndex: detail && detail.answer.orderIndex,
      peronalityGroups: detail ? detail.peronalityGroups : [],
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]:
        e.target.type === 'number' || e.target.name === 'personalityGroupId'
          ? +e.target.value
          : e.target.value,
    })
  }

  const onSubmit = (modal) => {
    onCloseModal(modal)
    if (detail) {
      dispatch(
        AnswerActions.onUpdate({
          answer_id: detail.answer.answerId,
          question_id: question_id,
          data: inputField,
        }),
      )
    } else {
      dispatch(
        AnswerActions.onCreate({
          data: { ...inputField, personalityGroupId: inputField.peronalityGroups },
          question_id,
        }),
      )
    }
  }

  const setPGList = () => {
    const custom = pgs.map(
      ({ personalityGroupName: label, personalityGroupId: value, ...rest }) => ({
        label,
        value,
        ...rest,
      }),
    )
    return custom
  }

  const setSelector = () => {
    var selector = []
    detail.peronalityGroups.map((item) => {
      selector.push({
        label: item.name,
        value: item.pGroupId,
      })
    })
    return selector
  }

  const selectorsHandler = (value, action) => {
    var peronalityGroups = []
    value.map((item) => {
      peronalityGroups.push(item.value)
    })
    setInputField({
      ...inputField,
      peronalityGroups,
    })
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
                </div>
                <div className="col-6">
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
                <div className="col-6">
                  <div className="mb-2">
                    <CFormLabel htmlFor="personalityGroupId">Personality Group</CFormLabel>
                    <Select
                      options={setPGList()}
                      defaultValue={detail ? setSelector() : []}
                      isDisabled={detail ? true : false}
                      onChange={selectorsHandler}
                      name="personalityGroupId"
                      isMulti
                      components={animatedComponents}
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
