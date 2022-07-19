import React, { useState, useEffect } from 'react'
import {
  CAvatar,
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
  CFormSwitch,
} from '@coreui/react'

function Detail(props) {
  const { large, detail, onClose, onClearDetail } = props
  const [inputField, setInputField] = useState({})

  useEffect(() => () => onClearDetail(), [])

  useEffect(() => {
    setInputField({
      fullName: detail && detail.fullName,
      gender: detail && detail.gender,
      phoneNumber: detail && detail.phoneNumber !== null && detail.phoneNumber,
      birthDay: detail && detail.birthDay,
      userName: detail && detail.userName,
      email: detail && detail.email,
      roleName: detail && detail.roleName,
      imagePath: detail && detail.imagePath,
      isLocked: detail && detail.isLocked,
      grade: detail && detail.grade,
      gpa10: detail && detail.gpa10,
      gpa11: detail && detail.gpa11,
      gpa12: detail && detail.gpa12,
      adminUpdate: detail && detail.adminUpdate,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{detail ? 'Edit system user infomation' : 'Add new system user'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-6">
                  <div className="mb-2 rounded border p-2">
                    <CAvatar src={inputField.imagePath} className="float-start me-2" />
                    <CFormLabel htmlFor="userName">{inputField.userName || ''}</CFormLabel>
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="fullName">Full name</CFormLabel>
                    <CFormInput
                      disabled
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={inputField.fullName || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="gender">Gender</CFormLabel>
                    <CFormSelect
                      disabled
                      name="gender"
                      value={inputField.gender || 'false'}
                      onChange={inputsHandler}
                    >
                      <option>Select the gender</option>
                      <option value="true">Female</option>
                      <option value="false">Male</option>
                    </CFormSelect>
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="phoneNumberd">Phone</CFormLabel>
                    <CFormInput
                      disabled
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={inputField.phoneNumber || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="birthDay">Birthday</CFormLabel>
                    <CFormInput
                      disabled
                      type="date"
                      name="birthDay"
                      id="birthDay"
                      value={inputField.birthDay || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-2">
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput
                      disabled
                      type="mail"
                      name="email"
                      id="email"
                      value={inputField.email || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="roleName">Role</CFormLabel>
                    <CFormSelect
                      name="roleName"
                      id="roleName"
                      value={inputField.roleName}
                      onChange={inputsHandler}
                      disabled
                    >
                      <option>Select the role</option>
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </CFormSelect>
                  </div>
                  <div className="mb-2">
                    <CFormSwitch
                      label="Locked"
                      id="isLocked"
                      name="isLocked"
                      defaultChecked={inputField.isLocked}
                      disabled
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-2">
                        <CFormLabel htmlFor="grade">Grade</CFormLabel>
                        <CFormInput
                          type="number"
                          name="grade"
                          id="grade"
                          value={inputField.grade || ''}
                          onChange={inputsHandler}
                          disabled
                        />
                      </div>
                      <div className="mb-2">
                        <CFormLabel htmlFor="gpa10">GPA 10</CFormLabel>
                        <CFormInput
                          type="number"
                          name="gpa10"
                          id="gpa10"
                          value={inputField.gpa10 || ''}
                          onChange={inputsHandler}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-2">
                        <CFormLabel htmlFor="gpa11">GPA 11</CFormLabel>
                        <CFormInput
                          type="number"
                          name="gpa11"
                          id="gpa11"
                          value={inputField.gpa11 || ''}
                          onChange={inputsHandler}
                          disabled
                        />
                      </div>
                      <div className="mb-2">
                        <CFormLabel htmlFor="gpa12">GPA 12</CFormLabel>
                        <CFormInput
                          type="number"
                          name="gpa12"
                          id="gpa12"
                          value={inputField.gpa12 || ''}
                          onChange={inputsHandler}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CForm>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => onClose(!large)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default Detail
