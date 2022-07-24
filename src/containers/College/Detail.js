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
import CollegeActions from '../../redux/actions/college'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter } = props
  const [inputField, setInputField] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    setInputField({
      collegeName: detail && detail.collegeName,
      referenceLink: detail && detail.referenceLink,
      address: detail && detail.address,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  const onSubmit = (large) => {
    onClose(large)
    /* dispatch(
      CollegeActions.onUpdate({
        data: { ...inputField, personalityGroupName: inputField.name },
        id: detail.id,
      }),
    ) */
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>
          {detail ? 'Edit a college' : 'Add new college'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2">
                    <CFormLabel htmlFor="collegeName">Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="collegeName"
                      name="collegeName"
                      value={inputField.collegeName || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="address">Address</CFormLabel>
                    <CFormInput
                      type="text"
                      id="address"
                      name="address"
                      value={inputField.address || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="referenceLink">Reference Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="referenceLink"
                      name="referenceLink"
                      value={inputField.referenceLink || ''}
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
