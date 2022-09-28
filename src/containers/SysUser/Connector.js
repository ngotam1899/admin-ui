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
import { toastError } from '../../util/toastHelper'

function Connector(props) {
  const { large, onClose, colleges } = props
  const [college, setCollege] = useState(null)
  const [inputField, setInputField] = useState({})
  const [searchKeywork, setSearchKeywork] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const dispatch = useDispatch()

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setSearchResult(colleges.filter((item) => item.collegeName.toLowerCase().indexOf(searchKeywork.toLowerCase()) > -1).slice(0, 5))
  }, [searchKeywork])

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
    if(inputField.password !== inputField.rePassword) {
      toastError("Mật khẩu không trùng khớp")
    } else {
      dispatch(UserActions.onCreateConnector({
        data: {
          fullName: inputField.fullName,
          gender: inputField.gender || true,
          phoneNumber: inputField.phoneNumber,
          userName: inputField.userName,
          email: inputField.email,
          password: inputField.password,
          collegesId: college.collegeId
        }
      }))
    }

  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Add a connector</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-6">
                  <div className="mb-2">
                    <CFormLabel htmlFor="userName">Username</CFormLabel>
                    <CFormInput
                      type="text"
                      id="userName"
                      name="userName"
                      value={inputField.userName || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="fullName">Full name</CFormLabel>
                    <CFormInput
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
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={inputField.phoneNumber || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-2">
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput
                      type="mail"
                      name="email"
                      id="email"
                      value={inputField.email || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="password">Password</CFormLabel>
                    <CFormInput
                      type="password"
                      name="password"
                      id="password"
                      value={inputField.password || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="rePassword">Re-enter Password</CFormLabel>
                    <CFormInput
                      type="password"
                      name="rePassword"
                      id="rePassword"
                      value={inputField.rePassword || ''}
                      onChange={inputsHandler}
                    />
                  </div>
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

export default Connector
