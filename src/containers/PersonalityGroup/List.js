import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PGActions from '../../redux/actions/personalityGroup'

function List(props) {
  const dispatch = useDispatch();
  const pgs = useSelector(state => (state.personalityGroup || []))

  useEffect(() => {
    dispatch(PGActions.onGetList());
    console.log(pgs)
  }, []);

  return (<div>{/* <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <div className="row">
                  <div className="col-6">
                    <h5 className="my-2">List of Personality Group</h5>
                    <p className="float-left my-2 mr-3 font-italic">Có tất cả {total} kết quả tìm kiếm</p>
                    <CButton
                      className="ml-2 float-left"
                      onClick={()=> this.destroyFilter()}
                      color="info"
                    > <i className="fa fa-eraser mr-1"></i>
                      Xóa tất cả bộ lọc
                    </CButton>
                    <CButton
                      onClick={() => this.setLarge(!large)}
                      className="mb-1 float-right"
                      color="success"
                    > Thêm quảng cáo
                    </CButton>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-danger">
                      <div className="p-2">
                        <b className="text-white">Tình trạng quảng cáo</b>
                        <select className="form-control mt-2" value={filter.status} name="status" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn tình trạng phiếu</option>
                          <option value="-1">Chưa diễn ra</option>
                          <option value="0">Đang diễn ra</option>
                          <option value="1">Đã diễn ra</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-primary">
                      <div className="p-2">
                        <b className="text-white">Duyệt trạng thái kích hoạt</b>
                        <select className="form-control mt-2" value={filter.active ? filter.active : this.state.filter.active} name="active" onChange={this.handleChangeFilter}>
                          <option key={-1} value="0">Chọn kiểu trạng thái</option>
                          <option value="1">Hiển thị trên trang bán hàng</option>
                          <option value="-1">Ẩn trên trang bán hàng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listAd}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'image': (item)=>(
                      <td>
                        <img src={ item.image ? item.image.public_url : INITIAL_IMAGE } style={{width:'10vw'}} alt={item.name} />
                      </td>
                    ),
                    'start': (item)=>(
                      <td>
                        <p>{new Date(item.startedAt).toLocaleDateString("vi-VN")}</p>
                      </td>
                    ),
                    'end': (item)=>(
                      <td>
                        <p>{new Date(item.endedAt).toLocaleDateString("vi-VN")}</p>
                      </td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.onSubmit(item._id, "đổi trạng thái", item.active)}
                          className={item.active ? "mr-1 mb-1 mb-xl-0 bg-purple" : "mr-1 mb-1 mb-xl-0 bg-orange"}
                        >
                          {item.active===true ? "Deactivate" : "Activate"}
                        </CButton>
                        <CButton
                          onClick={() => this.onUpdate(!large, item._id)}
                          className="mr-1 mb-1 mb-xl-0"
                          color="warning"
                        >
                          Sửa
                        </CButton>
                        <CButton
                          onClick={() => this.onSubmit(item._id, "xóa", null)}
                          className="mr-1"
                          color="danger"
                        >
                          Xóa
                        </CButton>
                      </td>)
                  }}
                />
                {(adDetail && large) && <AdDetail large={large} ad={adDetail} onClose={this.onClose} onClearDetail={onClearDetail} queryParams={queryParams}/>}
                {(!adDetail && large) && <AdDetail large={large} onClose={this.onClose} onClearDetail={onClearDetail} queryParams={queryParams}/>}
              </CCardBody>
              <div className="row justify-content-center">
              {total && total > 12 && <Pagination
                  activePage={filter.page ? parseInt(filter.page)+1 : 1}
                  itemsCountPerPage={this.state.filter.limit}
                  totalItemsCount={total}
                  pageRangeDisplayed={2}
                  linkClass="page-link"
                  itemClass="page-item"
                  prevPageText="Previous"
                  nextPageText="Next"
                  hideFirstLastPages={true}
                  onChange={this.handlePageChange.bind(this)}
                />}
              </div>
            </CCard>
          </CCol>
        </CRow> */}</div>

  );
}

export default List;
