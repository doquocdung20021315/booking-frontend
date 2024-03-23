import { Button, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../components/AppointmentPage/AppointmentPage.scss";
import {
  deleteAppointmentAccount,
  getAllAppointmentAccount,
} from "../../reducers/appointmentSlice";

const AppointmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const listAppointment = useSelector((state) => state.appointment);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getAllAppointmentAccount({ token }));
    }
  }, []);

  // console.log(listAppointment.length);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoAppointment, setInfoAppointment] = useState(null);

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleClickInfo = (appointment) => {
    setInfoAppointment(appointment);
    setInfoModalOpen(true);
  };

  const handleCancelInfoModal = () => {
    setInfoModalOpen(false);
  };

  const handleClickCancel = async (appointment) => {
    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(
        deleteAppointmentAccount({
          token,
          appointmentId: appointment._id,
        })
      );
      await dispatch(getAllAppointmentAccount({ token }));
    }
  };

  return (
    <div className="appointment-container">
      {listAppointment?.length === 0 ? (
        <h1 style={{ marginTop: "5rem" }}>Bạn không có lịch hẹn nào.</h1>
      ) : (
        ""
      )}
      {account.fullname !== "" ? (
        <div className="appointment-list">
          {listAppointment?.map((appointment, index) => (
            <Card
              key={index}
              className="appointment-card"
              style={{ width: "46%", marginBottom: "1rem" }}
            >
              <div className="appointment">
                <div className="appointment-img">
                  <img
                    src={
                      appointment.facility.service === "Y tế"
                        ? "https://dtnh.hcmulaw.edu.vn/upload/images/LOGO/health-heart-free-vector-icon-800x566.jpg"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4_3kqoCf3mzByz9BAD-iljhvMCU4W8EbQdQ&usqp=CAU"
                    }
                    alt="img-hospital"
                    width="64"
                  />
                </div>

                <div className="appointment-content">
                  <div className="appointment-name">
                    {appointment.facility.name}
                  </div>
                  <div className="appointment-location">
                    {appointment.facility.location}
                  </div>
                  <div className="appointment-datetime">
                    {appointment.time} ngày {appointment.date}
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
                <Button onClick={() => handleClickCancel(appointment)}>
                  Hủy lịch
                </Button>
              </div>
            </Card>
          ))}
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
        </div>

        <div className="appointment-title">Thông tin đặt lịch</div>
        <div className="success-facility">
          <div className="success-facility-img">
            {infoAppointment?.facility.service === "Y tế" ? (
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
              {infoAppointment?.facility.name}
            </div>
            <div>{infoAppointment?.facility.location}</div>
          </div>
        </div>
        <hr />
        {infoAppointment?.facility.service === "Y tế" ? (
          <div className="success-doctor">
            <div className="success-doctor-icon">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div>
              <div className="success-doctor-name">
                {infoAppointment?.doctor.degree +
                  " " +
                  infoAppointment?.doctor.name}
              </div>
              <div>Giới tính: {infoAppointment?.doctor.gender}</div>
              <div>Chuyên khoa: {infoAppointment?.doctor.specialist}</div>
              <div>Giá khám: {infoAppointment?.doctor.price}đ</div>
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
              {infoAppointment?.time} ngày {infoAppointment?.date}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentPage;
