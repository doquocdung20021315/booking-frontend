import { Button, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../components/AppointmentPage/AppointmentPage.scss";
import {
  deleteAppointmentAccount,
  getAllAppointmentAccount,
} from "../../reducers/appointmentSlice";
import { getInfoFacility } from "../../reducers/listFacilitySlice";
import { getInfoDoctor } from "../../reducers/listDoctorBookingSlice";
import dayjs from "dayjs";

const AppointmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const listAppointment = useSelector((state) => state.appointment);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    if (token) {
      dispatch(getAllAppointmentAccount({ token }));
    }
    if (roleId === "2" || roleId === "3" || roleId === "4") {
      navigate("/");
    }
  }, []);

  // console.log(listAppointment.length);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  const [infoAppointment, setInfoAppointment] = useState(null);
  const [modifyAppointment, setModifyAppointment] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(null);

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const tab1 = document.querySelector(".tab1");
  const tab2 = document.querySelector(".tab2");

  const handleClickTab1 = async () => {
    tab1?.classList.add("tab-active");
    tab2?.classList.remove("tab-active");
    const token = localStorage.getItem("token");
    await dispatch(getAllAppointmentAccount({ token, status: "1" }));
  };

  const handleClickTab2 = async () => {
    tab1?.classList.remove("tab-active");
    tab2?.classList.add("tab-active");
    const token = localStorage.getItem("token");
    await dispatch(getAllAppointmentAccount({ token, status: "2" }));
  };

  const handleClickInfo = (appointment) => {
    setInfoAppointment(appointment);
    setInfoModalOpen(true);
  };

  const handleCancelInfoModal = () => {
    setInfoModalOpen(false);
  };

  const handleClickModify = (appointment) => {
    setModifyAppointment(appointment);
    setModifyModalOpen(true);
  };

  const handleOkModifyModal = async () => {
    const facility = await dispatch(
      getInfoFacility({ facilityID: modifyAppointment.facilityID })
    );

    if (modifyAppointment.service === "Y tế") {
      const doctor = await dispatch(
        getInfoDoctor({ doctorID: modifyAppointment.doctorID })
      );

      navigate("/booking/datetime", {
        state: {
          doctor: doctor?.payload,
          facility: facility?.payload,
          specialist: modifyAppointment.specialist,
          isModify: true,
          modifyAppointmentId: modifyAppointment._id,
        },
      });
    } else if (modifyAppointment.service === "Hành chính") {
      navigate("/booking/datetime", {
        state: {
          facility: facility?.payload,
          specialist: modifyAppointment.specialist,
          isModify: true,
          modifyAppointmentId: modifyAppointment._id,
        },
      });
    }
  };

  const handleCancelModifyModal = () => {
    setModifyModalOpen(false);
  };

  const handleClickCancel = (appointment) => {
    setCancelAppointment(appointment);
    setCancelModalOpen(true);
  };

  const handleOkCancelModal = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(
        deleteAppointmentAccount({
          token,
          appointmentId: cancelAppointment._id,
        })
      );
      await dispatch(getAllAppointmentAccount({ token }));
    }
    setCancelModalOpen(false);
  };

  const handleCancelCancelModal = () => {
    setCancelModalOpen(false);
  };

  return (
    <div className="appointment-container">
      {account.fullname !== "" ? (
        <div className="appointment-box">
          <div className="appointment-tab-list">
            <div
              className="appointment-tab tab1 tab-active"
              onClick={handleClickTab1}
            >
              Lịch hẹn mới
            </div>
            <div className="appointment-tab tab2" onClick={handleClickTab2}>
              Lịch sử
            </div>
          </div>

          <div className="appointment-list">
            {listAppointment?.length === 0 ? (
              <div className="no-appointment">
                <h2>Bạn không có lịch hẹn nào.</h2>
              </div>
            ) : (
              ""
            )}
            {listAppointment?.map((appointment, index) => (
              <Card
                key={index}
                className={
                  appointment.status === "2"
                    ? "appointment-card appointment-card-came"
                    : appointment.status === "3"
                    ? "appointment-card appointment-card-not-come"
                    : "appointment-card"
                }
                style={{ marginBottom: "1rem" }}
              >
                <div className="appointment">
                  <div className="appointment-img">
                    <img
                      src={
                        appointment.service === "Y tế"
                          ? "https://dtnh.hcmulaw.edu.vn/upload/images/LOGO/health-heart-free-vector-icon-800x566.jpg"
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4_3kqoCf3mzByz9BAD-iljhvMCU4W8EbQdQ&usqp=CAU"
                      }
                      alt="img-hospital"
                      width="64"
                    />
                  </div>

                  <div className="appointment-content">
                    <div className="appointment-name">
                      {appointment.facilityName}
                    </div>
                    <div className="appointment-location">
                      {appointment.location}
                    </div>
                    <div className="appointment-datetime">
                      {appointment.time} ngày{" "}
                      {dayjs(appointment.date, "YYYY-MM-DD").format(
                        "DD-MM-YYYY"
                      )}
                    </div>
                  </div>
                </div>

                <div className="appointment-button-box">
                  <Button
                    type="primary"
                    onClick={() => handleClickInfo(appointment)}
                  >
                    Chi tiết
                  </Button>
                  {appointment.status === "1" ? (
                    <Button onClick={() => handleClickModify(appointment)}>
                      Đổi lịch
                    </Button>
                  ) : (
                    ""
                  )}
                  {appointment.status === "1" ? (
                    <Button onClick={() => handleClickCancel(appointment)}>
                      Hủy lịch
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Modal
          title="Bạn chưa đăng nhập"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Về trang chủ
            </Button>,
            <Button key="login" type="primary" onClick={handleOk}>
              Đăng nhập
            </Button>,
          ]}
        >
          <p>Bạn cần đăng nhập để sử dụng tính năng này.</p>
        </Modal>
      )}

      <Modal
        className="appointment-info-modal"
        title="Thông tin lịch hẹn"
        open={infoModalOpen}
        onCancel={handleCancelInfoModal}
        footer={[
          <Button key="back" onClick={handleCancelInfoModal}>
            Đóng
          </Button>,
        ]}
      >
        <div className="appointment-title">Thông tin cá nhân</div>
        <div>
          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-user"></i>
              </div>
              <span className="success-profile-info">
                Họ và tên: {account.fullname}
              </span>
            </div>
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-mars-and-venus"></i>
              </div>
              <span className="success-profile-info">
                Giới tính: {account.gender}
              </span>
            </div>
          </div>
          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <span className="success-profile-info">
                Ngày sinh: {account.birthday}
              </span>
            </div>
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-phone"></i>
              </div>
              <span className="success-profile-info">SĐT: {account.phone}</span>
            </div>
          </div>
          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div>
                <i className="fa-solid fa-envelope"></i>
              </div>
              <span className="success-profile-info">
                Email: {account.email}
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
            <div>{infoAppointment?.appointmentId}</div>
          </div>
        </div>
        <hr />
        <div className="success-facility">
          <div className="success-facility-img">
            {infoAppointment?.service === "Y tế" ? (
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
              {infoAppointment?.facilityName}
            </div>
            <div>{infoAppointment?.location}</div>
          </div>
        </div>
        <hr />
        {infoAppointment?.service === "Y tế" ? (
          <div className="success-doctor">
            <div className="success-doctor-icon">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div>
              <div className="success-doctor-name">
                {infoAppointment?.doctorDegree +
                  " " +
                  infoAppointment?.doctorName}
              </div>
              <div>Giới tính: {infoAppointment?.doctorGender}</div>
              <div>Chuyên khoa: {infoAppointment?.specialist}</div>
              <div>Giá khám: {infoAppointment?.doctorPrice}đ</div>
            </div>
          </div>
        ) : (
          <div className="success-specialist">
            <div className="success-specialist-icon">
              <i className="fa-solid fa-ticket"></i>
            </div>
            <div>
              <div className="success-specialist-title">Lĩnh vực</div>
              <div>{infoAppointment?.specialist}</div>
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
              {infoAppointment?.time} ngày{" "}
              {dayjs(infoAppointment?.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Xác nhận hủy lịch"
        open={cancelModalOpen}
        onOk={handleOkCancelModal}
        onCancel={handleCancelCancelModal}
        footer={[
          <Button key="back" onClick={handleCancelCancelModal}>
            Quay lại
          </Button>,
          <Button key="confirm" type="primary" onClick={handleOkCancelModal}>
            Hủy lịch
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn hủy lịch hẹn này không?</p>
      </Modal>

      <Modal
        title="Xác nhận đổi lịch"
        open={modifyModalOpen}
        onOk={handleOkModifyModal}
        onCancel={handleCancelModifyModal}
        footer={[
          <Button key="back" onClick={handleCancelModifyModal}>
            Quay lại
          </Button>,
          <Button key="confirm" type="primary" onClick={handleOkModifyModal}>
            Đổi lịch
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn đổi lịch hẹn này không?</p>
      </Modal>
    </div>
  );
};

export default AppointmentPage;
