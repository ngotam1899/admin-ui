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
import PGActions from '../../redux/actions/personalityGroup'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter } = props
  const [inputField, setInputField] = useState({})
  const dispatch = useDispatch()

  useEffect(() => () => onClearDetail(), [])

  useEffect(() => {
    setInputField({
      name: detail && detail.name,
      description: detail && detail.description,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  const onSubmit = (large) => {
    onClose(large)
    dispatch(
      PGActions.onUpdate({
        data: { ...inputField, personalityGroupName: inputField.name },
        id: detail.id,
      }),
    )
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>
          {detail ? 'Edit a personality group' : 'Add new personality group'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2">
                    <CFormLabel htmlFor="name">Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="name"
                      name="name"
                      value={inputField.name || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="description">Description</CFormLabel>
                    <CFormTextarea
                      id="description"
                      rows="6"
                      value={inputField.description || ''}
                      onChange={inputsHandler}
                      name="description"
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
