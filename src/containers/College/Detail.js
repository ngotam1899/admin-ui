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
  CFormTextarea,
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
  const { large, detail, onClose, onClearDetail, filter } = props
  const noImage = INITIAL_IMAGE
  const [inputField, setInputField] = useState({})
  const [previewSource, setPreviewSource] = useState('')
  const [sumPoint, setSumPoint] = useState(0)
  const [editting, setEditting] = useState('')
  const [keywork, setKeywork] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setInputField({
      collegeName: detail && detail.collegeName,
      referenceLink: detail && detail.referenceLink,
      address: detail && detail.address,
      imagePath: detail && detail.imagePath,
      major: detail && detail.major,
    })
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  const onSubmit = (large) => {
    onClose(large)
    if(detail) {
      dispatch(
        CollegeActions.onUpdate({
          data: { ...inputField, imagePath : previewSource !== '' ? previewSource : inputField.imagePath, collegeId: detail.collegeId },
          params: filter,
        }),
      )
    }
    else {
      dispatch(
        CollegeActions.onCreate({
          data: { ...inputField, imagePath : previewSource !== '' ? previewSource : inputField.imagePath },
          params: filter,
        }),
      )
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    };
  };

  const onUpdatePoint = (subjectGroupId, majorId) => {
    setEditting('')
    dispatch(CollegeActions.onUpdateSubjectPoint({
      data: { subjectGroupId, majorId, collegesId: detail.collegeId, sum: +sumPoint },
      college_id: detail.collegeId
    }))
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
            <label>Ảnh quảng cáo:</label>
                {inputField.imagePath ? <div className="form-group img-thumbnail3">
                {
                  previewSource ? (
                    <img src={previewSource} className="w-100" alt=""/>
                  )
                  : <img src={inputField.imagePath || noImage} style={{ border: '1px solid', width: '100%' }} alt=""/>
                }
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="image" id="fileInput"
                  onChange={handleFileInputChange} style={{width: '100%'}}/>
                </div>
              </div>
              : <div className="form-group img-thumbnail3">
                {
                  previewSource ? (
                    <img src={previewSource} className="w-100" alt=""/>
                  )
                  : <img src={noImage} alt="" style={{ border: '1px solid', width: '100%' }}></img>
                }
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="image" id="fileInput"
                    onChange={handleFileInputChange} style={{width: '100%'}}/>
                </div>
              </div>}
            </div>
          </div>
          <div className="col-12">
            <div className="card text-white mb-3">
              <div className="card-header bg-primary">
                Majors
              </div>
              <div className="card-body text-dark">
                <div className="row">
                  <div className="col-12">
                  <CFormInput
                    type="text"
                    id="keywork"
                    name="keywork"
                    className="mb-2"
                    value={keywork || ''}
                    onChange={inputsHandler}
                  />

                  <CListGroup>
                  {inputField.major && inputField.major.map((item, index) => {
                    return (<CListGroupItem key={index}>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{item.name}</h5>
                      <CButton
                        onClick={() => onUpdatePoint(!large, sub.id)}
                        className="mr-1 mb-1 mb-xl-0 text-white"
                        color="danger"
                      >
                        Delete major
                      </CButton>
                    </div>
                    <CTable responsive="xxl">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Point</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {item.subjectGroup.length > 0 &&
                          item.subjectGroup.map((sub) => {
                            return (
                              <CTableRow key={sub.id}>
                                <CTableHeaderCell scope="row">{sub.id}</CTableHeaderCell>
                                <CTableDataCell>{sub.name}</CTableDataCell>
                                <CTableDataCell>{editting !== sub.id ? sub.sumPoint : <CFormInput
                                  type="number"
                                  id="sumPoint"
                                  name="sumPoint"
                                  value={sumPoint}
                                  onChange={(e) => setSumPoint(e.target.value)}
                                />}</CTableDataCell>
                                <CTableDataCell>
                                  {editting !== sub.id ? <CButton
                                    onClick={() => {setEditting(sub.id); setSumPoint(sub.sumPoint)}}
                                    className="mr-1 mb-1 mb-xl-0"
                                    color="warning"
                                  >
                                    Edit
                                  </CButton> :
                                  <CButton
                                    onClick={() => onUpdatePoint(sub.id, item.id)}
                                    className="mr-1 mb-1 mb-xl-0"
                                    color="primary"
                                  >
                                    Save change
                                  </CButton>}
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })}
                      </CTableBody>
                    </CTable>
                  </CListGroupItem>)
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
