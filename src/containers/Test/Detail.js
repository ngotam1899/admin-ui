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
  CFormTextarea,
} from '@coreui/react'
import TestActions from '../../redux/actions/test'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter, test_id } = props
  const [inputField, setInputField] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(detail)
    setInputField({
      testDescrip: detail && detail.testDescrip,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    dispatch(
      TestActions.onCreate({
        test_id: test_id,
        data: inputField,
      }),
    )
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
