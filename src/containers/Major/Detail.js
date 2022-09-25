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
} from '@coreui/react'
import MajorActions from '../../redux/actions/major'

function Detail(props) {
  const { large, detail, onClose, onClearDetail, filter, sgs } = props
  const [inputField, setInputField] = useState({})
  const [searchKeywork, setSearchKeywork] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [sgList, setSgList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setInputField({
      name: detail && detail.name,
      subjectGroupIds: detail && detail.subjectGroupIds,
    })
  }, [detail])

  useEffect(() => {
    setSearchResult(
      sgs
        .filter((item) => item.name.toLowerCase().indexOf(searchKeywork.toLowerCase()) > -1)
        .slice(0, 5),
    )
  }, [searchKeywork])

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  const inputsKeyword = (e) => {
    setSearchKeywork(e.target.value)
  }

  const onAddSG = (item) => {
    if (sgList.length > 0 && sgList.map((object) => object.id).indexOf(item.id) > -1) {
    } else {
      setSgList([...sgList, item])
    }
    setSearchKeywork('')
  }

  const onRemoveSG = (item) => {
    var filtered = sgList.filter(function (el) {
      return el.id != item.id
    })
    setSgList(filtered)
  }

  const onSubmit = (large) => {
    onClose(large)
    if (detail) {
      console.log(detail)
    } else {
      let subjectGroupIds = sgList.map(function (item) {
        return item['id']
      })
      dispatch(
        MajorActions.onCreate({
          data: {
            name: inputField.name,
            subjectGroupIds: subjectGroupIds,
          },
        }),
      )
    }
  }

  return (
    <CModal visible={large} onClose={() => onClose(!large)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{detail ? 'Edit a major' : 'Add new major'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row">
          <div className="col-12">
            <CForm>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2">
                    <CFormLabel htmlFor="questionContent">Name</CFormLabel>
                    <CFormInput
                      type="text"
                      name="name"
                      id="name"
                      value={inputField.name || ''}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <CFormLabel htmlFor="orderIndex">Subject groups</CFormLabel>
                    <CFormInput
                      type="text"
                      id="searchKeywork"
                      name="searchKeywork"
                      placeholder="Search to add a subject group"
                      className="mb-2"
                      value={searchKeywork || ''}
                      onChange={inputsKeyword}
                    />

                    <CListGroup>
                      {searchKeywork.length > 0 &&
                        searchResult.length > 0 &&
                        searchResult.map((item) => (
                          <CListGroupItem key={item.id}>
                            {item.name}
                            <CButton
                              onClick={() => onAddSG(item)}
                              className="mr-1 mb-1 mb-xl-0 float-right"
                              color="success"
                            >
                              Add
                            </CButton>
                          </CListGroupItem>
                        ))}
                    </CListGroup>
                    <CListGroup>
                      {sgList &&
                        sgList.map((item, index) => {
                          return (
                            <CListGroupItem key={index}>
                              <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{item.name}</h5>
                                <CButton
                                  onClick={() => onRemoveSG(item)}
                                  className="mr-1 mb-1 mb-xl-0 float-right"
                                  color="danger"
                                >
                                  Remove
                                </CButton>
                              </div>
                            </CListGroupItem>
                          )
                        })}
                    </CListGroup>
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
