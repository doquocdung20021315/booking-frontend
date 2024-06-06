import { Button, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/ManageAppointmentPage/ManageAppointmentPage.scss";
import { getInfoAcc } from "../../reducers/accountSlice";
import {
  checkAppointment,
  deleteAppointment,
  getAllAppointmentFacility,
  searchAppointment,
  setListAppointment,
} from "../../reducers/appointmentSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ManageAppointmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const listAppointment = useSelector((state) => state.appointment);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    if (!token || roleId !== "2") {
      navigate("/");
    }

    dispatch(
      getAllAppointmentFacility({
        facilityID: account.facilityID,
      })
    );
  }, []);

  // console.log(listAppointment)

  const [showTable, setShowTable] = useState(1);

  const [searchValue, setSearchValue] = useState("");

  const [accountSelect, setAccountSelect] = useState(null);
  const [appointmentSelect, setAppointmentSelect] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const columns = [
    {
      title: "Mã số",
      dataIndex: "appointmentId",
      key: "1",
    },
    {
      title: "Ngày hẹn",
      dataIndex: "date",
      key: "2",
      render: (date) => (
        <span>{dayjs(date, "YYYY-MM-DD").format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Giờ hẹn",
      dataIndex: "time",
      key: "3",
    },
    {
      title: "Cơ cở",
      dataIndex: "facilityName",
      key: "4",
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "5",
    },
  ];

  const tab1 = document.querySelector(".tab1");
  const tab2 = document.querySelector(".tab2");
  const tab3 = document.querySelector(".tab3");

  const handleClickTab1 = async () => {
    tab1?.classList.add("tab-active");
    tab2?.classList.remove("tab-active");
    tab3?.classList.remove("tab-active");
    setShowTable(1);
    const { payload } = await dispatch(
      searchAppointment({
        appointmentId: searchValue,
        facilityID: account.facilityID,
      })
    );
    dispatch(setListAppointment(payload));
  };

  const handleClickTab2 = async () => {
    tab1?.classList.remove("tab-active");
    tab2?.classList.add("tab-active");
    tab3?.classList.remove("tab-active");
    setShowTable(2);
    const { payload } = await dispatch(
      searchAppointment({
        appointmentId: searchValue,
        facilityID: account.facilityID,
        status: "2",
      })
    );
    dispatch(setListAppointment(payload));
  };

  const handleClickTab3 = async () => {
    tab1?.classList.remove("tab-active");
    tab2?.classList.remove("tab-active");
    tab3?.classList.add("tab-active");
    setShowTable(3);
    const { payload } = await dispatch(
      searchAppointment({
        appointmentId: searchValue,
        facilityID: account.facilityID,
        status: "3",
      })
    );
    dispatch(setListAppointment(payload));
  };

  const onChangeSearchValue = async (e) => {
    setSearchValue(e.target.value);
  };

  const onAppointmentsSearch = async (value) => {
    const { payload } = await dispatch(
      searchAppointment({
        appointmentId: value,
        facilityID: account.facilityID,
        status: `${showTable}`,
      })
    );
    dispatch(setListAppointment(payload));
  };

  const handleCancelAppointment = async () => {
    await dispatch(
      deleteAppointment({
        appointmentId: appointmentSelect._id,
      })
    );
    const { payload } = await dispatch(
      searchAppointment({
        appointmentId: searchValue,
        facilityID: account.facilityID,
        status: `${showTable}`,
      })
    );
    dispatch(setListAppointment(payload));
    setInfoModalOpen(false);
  };

  const handleCancelInfoModal = () => {
    setInfoModalOpen(false);
  };

  const handleCame = async () => {
    await dispatch(
      checkAppointment({
        appointmentId: appointmentSelect._id,
        status: "2",
      })
    );
    const { payload } = await dispatch(
      searchAppointment({
        appointmentId: searchValue,
        facilityID: account.facilityID,
        status: `${showTable}`,
      })
    );
    dispatch(setListAppointment(payload));
    setInfoModalOpen(false);
  };

  const handleNotCome = async () => {
    await dispatch(
      checkAppointment({
        appointmentId: appointmentSelect._id,
        status: "3",
      })
    );
    const { payload } = await dispatch(
      searchAppointment({
        appointmentId: searchValue,
        facilityID: account.facilityID,
        status: `${showTable}`,
      })
    );
    dispatch(setListAppointment(payload));
    setInfoModalOpen(false);
  };

  return (
    <div className="manage-appointment-container">
      <div className="manage-appointment-box">
        <div className="manage-appointment-tab-list">
          <div
            className="manage-appointment-tab tab1 tab-active"
            onClick={handleClickTab1}
          >
            Đang chờ
          </div>
          <div
            className="manage-appointment-tab tab2"
            onClick={handleClickTab2}
          >
            Đã đến
          </div>
          <div
            className="manage-appointment-tab tab3"
            onClick={handleClickTab3}
          >
            Không đến
          </div>
        </div>

        <div className="manage-appointment-search">
          <Search
            placeholder="Tìm kiếm mã số"
            allowClear
            value={searchValue}
            onChange={onChangeSearchValue}
            onSearch={onAppointmentsSearch}
          />
        </div>

        <div className="list-appointment">
          <Table
            className="manage-appointment-table"
            columns={columns}
            dataSource={listAppointment}
            onRow={(appoint) => {
              return {
                onClick: async () => {
                  const { payload } = await dispatch(
                    getInfoAcc({
                      accountId: appoint.accountId,
                    })
                  );
                  setAccountSelect(payload);
                  setAppointmentSelect(appoint);
                  setInfoModalOpen(true);
                },
              };
            }}
            rowKey={(appoint) => {
              return appoint._id;
            }}
            pagination={{
              pageSize: 7,
              position: ["bottomCenter"],
            }}
          />
        </div>
      </div>

      <Modal
        className="appointment-info-modal"
        title="Thông tin lịch hẹn"
        open={infoModalOpen}
        onCancel={handleCancelInfoModal}
        footer={
          appointmentSelect?.status === "1"
            ? [
                <Button
                  className="check-button-cancel-appointment"
                  key="cancel"
                  onClick={handleCancelAppointment}
                >
                  Hủy lịch
                </Button>,
                <Button key="back" onClick={handleCancelInfoModal}>
                  Đóng
                </Button>,
                <Button
                  className="check-button-come"
                  key="came"
                  onClick={handleCame}
                >
                  Đã đến
                </Button>,
                <Button
                  className="check-button-not-come"
                  key="notCome"
                  onClick={handleNotCome}
                >
                  Không đến
                </Button>,
              ]
            : appointmentSelect?.status === "3"
            ? [
                <Button key="back" onClick={handleCancelInfoModal}>
                  Đóng
                </Button>,
                <Button
                  className="check-button-come"
                  key="came"
                  onClick={handleCame}
                >
                  Đã đến
                </Button>,
              ]
            : [
                <Button key="back" onClick={handleCancelInfoModal}>
                  Đóng
                </Button>,
              ]
        }
      >
        <div className="appointment-title">Thông tin cá nhân</div>
        <div>
          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-user"></i>
              </div>
              <span className="success-profile-info">
                Họ và tên: {accountSelect?.fullname}
              </span>
            </div>
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-mars-and-venus"></i>
              </div>
              <span className="success-profile-info">
                Giới tính: {accountSelect?.gender}
              </span>
            </div>
          </div>
          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <span className="success-profile-info">
                Ngày sinh: {accountSelect?.birthday}
              </span>
            </div>
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-phone"></i>
              </div>
              <span className="success-profile-info">
                SĐT: {accountSelect?.phone}
              </span>
            </div>
          </div>

          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-envelope"></i>
              </div>
              <span className="success-profile-info">
                Email: {accountSelect?.email}
              </span>
            </div>
          </div>
        </div>

        <div className="appointment-title">Thông tin đặt lịch</div>
        <div className="success-code">
          <div className="success-code-icon">
            <i className="fa-brands fa-codepen"></i>
          </div>
          <div>
            <div className="success-code-title">Mã số</div>
            <div>{appointmentSelect?.appointmentId}</div>
          </div>
        </div>
        <hr />
        <div className="success-facility">
          <div className="success-facility-img">
            {appointmentSelect?.service === "Y tế" ? (
              <img
                src="https://dtnh.hcmulaw.edu.vn/upload/images/LOGO/health-heart-free-vector-icon-800x566.jpg"
                alt="img-hospital"
                width="64"
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4_3kqoCf3mzByz9BAD-iljhvMCU4W8EbQdQ&usqp=CAU"
                alt="img-administrative"
                width="64"
              />
            )}
          </div>
          <div>
            <div className="success-facility-name">
              {appointmentSelect?.facilityName}
            </div>
            <div>{appointmentSelect?.location}</div>
          </div>
        </div>
        <hr />
        {appointmentSelect?.service === "Y tế" ? (
          <div className="success-doctor">
            <div className="success-doctor-icon">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div>
              <div className="success-doctor-name">
                {appointmentSelect?.doctorDegree +
                  " " +
                  appointmentSelect?.doctorName}
              </div>
              <div>Giới tính: {appointmentSelect?.doctorGender}</div>
              <div>Chuyên khoa: {appointmentSelect?.specialist}</div>
              <div>Giá khám: {appointmentSelect?.doctorPrice}đ</div>
            </div>
          </div>
        ) : (
          <div className="success-specialist">
            <div className="success-specialist-icon">
              <i className="fa-solid fa-ticket"></i>
            </div>
            <div>
              <div className="success-specialist-title">Lĩnh vực</div>
              <div>{appointmentSelect?.specialist}</div>
            </div>
          </div>
        )}
        <hr />
        <div className="success-datetime">
          <div className="success-datetime-icon">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <div className="success-datetime-title">Thời gian</div>
            <div>
              {appointmentSelect?.time} ngày{" "}
              {dayjs(appointmentSelect?.date, "YYYY-MM-DD").format(
                "DD-MM-YYYY"
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAppointmentPage;
