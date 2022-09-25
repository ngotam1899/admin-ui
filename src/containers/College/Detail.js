import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormLabel,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CollegeActions from '../../redux/actions/college'
import { INITIAL_IMAGE } from '../../constants'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter, majors } = props
  const noImage = INITIAL_IMAGE
  const [inputField, setInputField] = useState({})
  const [previewSource, setPreviewSource] = useState('')
  const [sumPoint, setSumPoint] = useState(0)
  const [editting, setEditting] = useState('')
  const [searchKeywork, setSearchKeywork] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const dispatch = useDispatch()

  useEffect(() => () => onClearDetail(), [])
  useEffect(() => {
    setInputField({
      collegeName: detail && detail.collegeName,
      referenceLink: detail && detail.referenceLink,
      address: detail && detail.address,
      imagePath: detail && detail.imagePath,
      major: detail && detail.major,
    })
  }, [detail])

  useEffect(() => {
    setSearchResult(majors.filter((item) => item.majorName.toLowerCase().indexOf(searchKeywork.toLowerCase()) > -1).slice(0, 5))
  }, [searchKeywork])

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  const inputsKeyword = (e) => {
    setSearchKeywork(e.target.value)
  }

  const onSubmit = (large) => {
    onClose(large)
    if (detail) {
      dispatch(
        CollegeActions.onUpdate({
          data: {
            ...inputField,
            imagePath: previewSource !== '' ? previewSource : inputField.imagePath,
            collegeId: detail.collegeId,
          },
          params: filter,
        }),
      )
    } else {
      dispatch(
        CollegeActions.onCreate({
          data: {
            ...inputField,
            imagePath: previewSource !== '' ? previewSource : inputField.imagePath,
          },
          params: filter,
        }),
      )
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const onUpdatePoint = (subjectGroupId, majorId) => {
    setEditting('')
    dispatch(
      CollegeActions.onUpdateSubjectPoint({
        data: { subjectGroupId, majorId, collegesId: detail.collegeId, sum: +sumPoint },
        college_id: detail.collegeId,
      }),
    )
  }

  const onAddMajor = (majorId) => {
    dispatch(CollegeActions.onAddMajor({college_id: detail.collegeId, majorId}))
  }

  const onRemoveMajor = (majorId) => {
    dispatch(CollegeActions.onRemoveMajor({college_id: detail.collegeId, majorId}))
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{detail ? 'Edit a college' : 'Add new college'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-9">
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
          <div className="col-3">
            <div className="mb-2">
              <CFormLabel htmlFor="image">Image</CFormLabel>
              {inputField.imagePath ? (
                <div className="form-group img-thumbnail">
                  {previewSource ? (
                    <img src={previewSource} className="w-100" alt="" />
                  ) : (
                    <img
                      src={inputField.imagePath || noImage}
                      style={{ width: '100%' }}
                      alt=""
                    />
                  )}
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input
                      type="file"
                      name="image"
                      id="fileInput"
                      onChange={handleFileInputChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group img-thumbnail">
                  {previewSource ? (
                    <img src={previewSource} className="w-100" alt="" />
                  ) : (
                    <img src={noImage} alt="" style={{ width: '100%' }}></img>
                  )}
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input
                      type="file"
                      name="image"
                      id="fileInput"
                      onChange={handleFileInputChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="card text-white mb-3">
              <div className="card-header bg-primary">Majors</div>
              <div className="card-body text-dark">
                <div className="row">
                  <div className="col-12">
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
                          {searchKeywork.length > 0 && searchResult.length > 0 && searchResult.map((item) => <CListGroupItem key={item.majorId}>{item.majorName}<CButton
                            onClick={() => onAddMajor(item.majorId)}
                            className="mr-1 mb-1 mb-xl-0 float-right"
                            color="success"
                          >
                            Add
                          </CButton></CListGroupItem>)}

                      </CListGroup>
                    </div>

                    <CListGroup>
                      {inputField.major &&
                        inputField.major.map((item, index) => {
                          console.log(item);
                          return (
                            <CListGroupItem key={index}>
                              <div className="d-flex w-100 justify-content-between">
                                <p className="mb-1">{item.name}</p>
                                <CButton
                                  onClick={() => onRemoveMajor(item.id)}
                                  className="mr-1 mb-1 mb-xl-0 text-white"
                                  color="danger"
                                >
                                  Delete major
                                </CButton>
                              </div>

                            </CListGroupItem>
                          )
                        })}
                    </CListGroup>
                  </div>
                </div>
              </div>
            </div>
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
