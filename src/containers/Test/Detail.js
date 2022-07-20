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
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import TestActions from '../../redux/actions/test'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter, test_id } = props
  const [inputField, setInputField] = useState({})
  const type = useSelector((state) => state.test.type || [])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(TestActions.onGetType())
  }, [])

  useEffect(() => {
    setInputField({
      testDescrip: detail && detail.testDescrip,
      typeId: detail && detail.testType.typeId,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    if (detail) {
      dispatch(
        TestActions.onUpdate({
          id: detail.testId,
          data: { ...inputField, testDescript: inputField.testDescrip },
        }),
      )
    } else {
      dispatch(
        TestActions.onCreate({
          type_id: inputField.typeId,
          data: inputField,
        }),
      )
    }
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{detail ? 'Edit a test' : 'Add new test'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2">
                    <CFormLabel htmlFor="testDescrip">Description</CFormLabel>
                    <CFormTextarea
                      id="testDescrip"
                      rows="6"
                      value={inputField.testDescrip || ''}
                      onChange={inputsHandler}
                      name="testDescrip"
                    ></CFormTextarea>
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="typeId">Type ID</CFormLabel>
                    <CFormSelect
                      id="typeId"
                      value={inputField.typeId || ''}
                      onChange={inputsHandler}
                      name="typeId"
                    >
                      <option value="">Select a type</option>
                      {type &&
                        type.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          )
                        })}
                    </CFormSelect>
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
