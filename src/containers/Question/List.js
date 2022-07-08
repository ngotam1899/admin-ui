import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import PGActions from '../../redux/actions/personalityGroup'
import TestActions from '../../redux/actions/test'
import Pagination from 'react-js-pagination'
import getFilterParams from '../../util/getFilterParams'
import qs from 'query-string'

function List(props) {
  const [filter, setFilter] = useState({
    PageNumber: 1,
    PageSize: 10,
  })
  const [activeKey, setActiveKey] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const pgs = useSelector((state) => state.personalityGroup.list || [])
  const type = useSelector((state) => state.test.type || [])
  const total = useSelector((state) => state.personalityGroup.total || 0)

  useEffect(() => {
    loadData()
  }, [location])

  const loadData = () => {
    const filters = getFilterParams(location.search)
    var params = {
      ...filter,
      ...filters,
    }
    setFilter(params)
    dispatch(PGActions.onGetList(params))
    dispatch(TestActions.onGetType())
  }

  // phân trang
  const handlePageChange = (PageNumber) => {
    handleUpdateFilter({ PageNumber })
  }
  const handleUpdateFilter = (data) => {
    const { pathname, search } = location
    let queryParams = getFilterParams(search)
    queryParams = {
      ...queryParams,
      ...data,
    }
    setFilter(queryParams)
    navigate(`${pathname}?${qs.stringify(queryParams)}`)
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="row">
              <div className="col-6">
                <h5 className="my-2">List of Question</h5>
                <CNav variant="pills" role="tablist">
                  {type &&
                    type.map((item, index) => {
                      return (
                        <CNavItem key={index}>
                          <CNavLink
                            href="javascript:void(0);"
                            active={activeKey === item.id}
                            onClick={() => setActiveKey(item.id)}
                          >
                            {item.name}
                          </CNavLink>
                        </CNavItem>
                      )
                    })}
                </CNav>
                <CTabContent>
                  <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu
                    stumptown aliqua, retro synth master cleanse. Mustache cliche tempor,
                    williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh
                    dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex
                    squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
                    american apparel, butcher voluptate nisi qui.
                  </CTabPane>
                  <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                    Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin
                    coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next
                    level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo
                    booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                    vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna
                    delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente
                    labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable
                    jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party
                    scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed
                    echo park.
                  </CTabPane>
                  <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                    Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out
                    mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade.
                    Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore
                    carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings
                    gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free,
                    carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you
                    probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork
                    sustainable tofu synth chambray yr.
                  </CTabPane>
                </CTabContent>
                <p className="float-left my-2 mr-3 font-italic">
                  Có tất cả {total} kết quả tìm kiếm
                </p>
                <CButton
                  className="ml-2 float-left"
                  onClick={() => this.destroyFilter()}
                  color="info"
                >
                  {' '}
                  <i className="fa fa-eraser mr-1"></i>
                  Xóa tất cả bộ lọc
                </CButton>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                >
                  {' '}
                  Add a Personality Group
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="xxl">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Group ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Group Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Test Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pgs.length > 0 &&
                  pgs.map((item) => {
                    return (
                      <CTableRow key={item.personalityGroupId}>
                        <CTableHeaderCell scope="row">{item.personalityGroupId}</CTableHeaderCell>
                        <CTableDataCell>{item.personalityGroupName}</CTableDataCell>
                        <CTableDataCell>{item.testTypeId}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => this.onUpdate(!large, item._id)}
                            className="mr-1 mb-1 mb-xl-0"
                            color="warning"
                          >
                            Sửa
                          </CButton>
                          <CButton
                            onClick={() => this.onSubmit(item._id, 'xóa', null)}
                            className="mr-1"
                            color="danger"
                          >
                            Xóa
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
            {/* {adDetail && large && (
                <AdDetail
                  large={large}
                  ad={adDetail}
                  onClose={this.onClose}
                  onClearDetail={onClearDetail}
                  queryParams={queryParams}
                />
              )}
              {!adDetail && large && (
                <AdDetail
                  large={large}
                  onClose={this.onClose}
                  onClearDetail={onClearDetail}
                  queryParams={queryParams}
                />
              )} */}
          </CCardBody>
          <CCardFooter>
            {total && total > 10 && (
              <Pagination
                activePage={+filter.PageNumber}
                itemsCountPerPage={filter.PageSize}
                totalItemsCount={total}
                pageRangeDisplayed={3}
                linkClass="page-link"
                itemClass="page-item"
                prevPageText="Previous"
                nextPageText="Next"
                hideFirstLastPages={true}
                onChange={handlePageChange.bind(this)}
              />
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
