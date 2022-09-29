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
  CFormTextarea,
} from '@coreui/react'
import BlogActions from '../../redux/actions/blog'
import { INITIAL_IMAGE } from '../../constants'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter, majors } = props
  const noImage = INITIAL_IMAGE
  const [inputField, setInputField] = useState({})
  const [previewSource, setPreviewSource] = useState('')
  const [editting, setEditting] = useState('')
  const [searchKeywork, setSearchKeywork] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const dispatch = useDispatch()

  useEffect(() => () => onClearDetail(), [])
  useEffect(() => {
    setInputField({
      title: detail && detail.title,
      description: detail && detail.description,
      image: detail && detail.blogImage,
    })
    console.log(detail)
  }, [detail])

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  const onSubmit = (large) => {
    onClose(large)
    if (detail) {
      dispatch(
        BlogActions.onUpdate({
          data: {
            ...inputField,
            image: previewSource !== '' ? previewSource : inputField.image,
          },
          blog_id: detail.blogId,
          params: filter,
        }),
      )
    } else {
      dispatch(
        BlogActions.onCreate({
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
                    <CFormLabel htmlFor="title">Title</CFormLabel>
                    <CFormInput
                      type="text"
                      id="title"
                      name="title"
                      value={inputField.title || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="description">Description</CFormLabel>
                    <CFormTextarea
                      id="description"
                      name="description"
                      rows="20"
                      value={inputField.description || ''}
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
              {inputField.image ? (
                <div className="form-group img-thumbnail">
                  {previewSource ? (
                    <img src={previewSource} className="w-100" alt="" />
                  ) : (
                    <img src={inputField.image || noImage} style={{ width: '100%' }} alt="" />
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
