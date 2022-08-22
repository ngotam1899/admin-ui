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
import MajorActions from '../../redux/actions/major'
import CollegeActions from '../../redux/actions/college'

const Dashboard = () => {
  const dispatch = useDispatch()
  const pgs = useSelector((state) => state.test.pg || [])
  const majorStatistic = useSelector((state) => state.major.statistic || [])
  const collegeStatistic = useSelector((state) => state.college.statistic || [])
  const [labelsPG, setLabelsPG] = useState([])
  const [dataPG, setDataPG] = useState([])
  const [labelsMajor, setLabelsMajor] = useState([])
  const [dataMajor, setDataMajor] = useState([])
  const [labelsCollege, setLabelsCollege] = useState([])
  const [dataCollege, setDataCollege] = useState([])

  useEffect(() => {
    dispatch(TestActions.onStatisticPG())
    dispatch(MajorActions.onStatistic({
      PageNumber: 1,
      PageSize: 30,
    }))
    dispatch(CollegeActions.onStatistic({
      PageNumber: 1,
      PageSize: 30,
    }))
  }, [])

  useEffect(() => {
    let labelsPG = []
    let dataPG = []
    pgs.map((item) => {
      labelsPG.push(item.groupName)
      dataPG.push(item.avgPoint.toFixed(2))
    })
    setLabelsPG(labelsPG)
    setDataPG(dataPG)
  }, [pgs])

  useEffect(() => {
    let labelsMajor = []
    let dataMajor = []
    majorStatistic.map((item) => {
      labelsMajor.push(item.majorName)
      dataMajor.push(item.selectedUser)
    })
    setLabelsMajor(labelsMajor)
    setDataMajor(dataMajor)
  }, [majorStatistic])

  useEffect(() => {
    let labelsCollege = []
    let dataCollege = []
    collegeStatistic.map((item) => {
      labelsCollege.push(item.collegeName)
      dataCollege.push(item.numOfUser)
    })
    setLabelsCollege(labelsCollege)
    setDataCollege(dataCollege)
  }, [collegeStatistic])

  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Statistic Personality Group</CCardHeader>
            <CCardBody>
              {pgs && (
                <CChart
                  type="bar"
                  data={{
                    labels: labelsPG,
                    datasets: [
                      {
                        label: 'Average Point',
                        backgroundColor: '#f87979',
                        data: dataPG,
                      },
                    ],
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Statistic Major</CCardHeader>
            <CCardBody>
              {majorStatistic && (
                <CChart
                  type="bar"
                  data={{
                    labels: labelsMajor,
                    datasets: [
                      {
                        label: 'Selected User',
                        backgroundColor: '#FCB415',
                        data: dataMajor,
                      },
                    ],
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Statistic College</CCardHeader>
            <CCardBody>
              {pgs && (
                <CChart
                  type="bar"
                  data={{
                    labels: labelsCollege,
                    datasets: [
                      {
                        label: 'Number of User',
                        backgroundColor: '#41B34E',
                        data: dataCollege,
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
