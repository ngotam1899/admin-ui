import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import { useDispatch, useSelector } from 'react-redux'
import TestActions from '../../redux/actions/test'

const Dashboard = () => {
  const dispatch = useDispatch()
  const pgs = useSelector((state) => state.test.pg || [])
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(TestActions.onStatisticPG())
  }, [])

  useEffect(() => {
    let labels = []
    let data = []
    pgs.map((item) => {
      labels.push(item.groupName)
      data.push(item.avgPoint.toFixed(2))
    })
    setLabels(labels)
    setData(data)
  }, [pgs])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Statistic Personality Group</CCardHeader>
            <CCardBody>
              {pgs && (
                <CChart
                  type="bar"
                  data={{
                    labels,
                    datasets: [
                      {
                        label: 'Average Point',
                        backgroundColor: '#f87979',
                        data,
                      },
                    ],
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
