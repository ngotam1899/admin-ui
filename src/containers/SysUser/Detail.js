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
  CListGroup,
  CListGroupItem
} from '@coreui/react'
import UserActions from '../../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, colleges } = props
  const [searchKeywork, setSearchKeywork] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [college, setCollege] = useState(null)
  const [inputField, setInputField] = useState({})
  const dispatch = useDispatch()

  useEffect(() => () => onClearDetail(), [])
  useEffect(() => {
    setSearchResult(colleges.filter((item) => item.collegeName.toLowerCase().indexOf(searchKeywork.toLowerCase()) > -1).slice(0, 5))
  }, [searchKeywork])

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
  const inputsKeyword = (e) => {
    setSearchKeywork(e.target.value)
  }
  const onAddCollege = (item) => {
    setSearchKeywork('')
    setCollege(item);
  }
  const onRemoveCollege = () => {
    setCollege(null)
  }

  const onSubmit = () => {
    let role_id = 0;
    switch (inputField.roleName) {
      case 'Student':
        role_id = 1;
        break;
      case 'Admin':
        role_id = 2;
        break;
      case 'Connector':
        role_id = 3;
        break;
      default:
        role_id = 1;
        break;
    }
    dispatch(UserActions.onUpdateRole({
      account_id: detail.userId,
      role_id,
      college_id : college.collegeId
    }))
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{detail ? 'System user infomation' : 'Add new system user'}</CModalTitle>
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
                    >
                      <option>Select the role</option>
                      <option value="Student">Student</option>
                      <option value="Admin">Admin</option>
                      <option value="Connector">Connector</option>
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
                    {inputField.roleName !== 'Connector' ? <><div className="col-6">
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
                    </div></> : <div className="col-12">
                      <CFormLabel htmlFor="searchKeywork">Search for college</CFormLabel>
                  <div className="search-input">
                      <CFormInput
                        type="text"
                        id="searchKeywork"
                        name="searchKeywork"
                        className="mb-2"
                        value={searchKeywork || ''}
                        onChange={inputsKeyword}
                      />

                        <CListGroup>
                          {searchKeywork.length > 0 && searchResult.length > 0 && searchResult.map((item) => <CListGroupItem key={item.collegeId}>{item.collegeName}<CButton
                            onClick={() => onAddCollege(item)}
                            className="mr-1 mb-1 mb-xl-0 float-right"
                            color="success"
                          >
                            Add
                          </CButton></CListGroupItem>)}

                      </CListGroup>
                      {college && <div className="mb-2 rounded border p-2">
                        <CFormLabel>{college.collegeName}</CFormLabel>
                        <CButton
                            onClick={() => onRemoveCollege()}
                            className="mr-1 mb-1 mb-xl-0 float-right"
                            color="danger"
                          >
                            Remove
                          </CButton>
                      </div>}

                    </div>
                    </div>}
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
