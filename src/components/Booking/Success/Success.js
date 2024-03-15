import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.scss";
import { Button, Card } from "antd";
import dayjs from "dayjs";
import { CheckCircleFilled } from "@ant-design/icons";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const account = useSelector((state) => state.account);

  // console.log(location.state);

  const selectDate = dayjs(location.state.date);

  const handleClickBook = () => {
    navigate("/");
  };

  return (
    <div className="success-container">
      <CheckCircleFilled className="success-icon" />
      <p className="success-text">Đặt lịch thành công</p>

      <Card
        title="Thông tin lịch hẹn"
        headStyle={{
          textAlign: "center",
          fontSize: "1.2rem",
        }}
        style={{ width: "30rem" }}
      >
        <h4>THÔNG TIN CÁ NHÂN</h4>
        <div>
          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div><i className="fa-solid fa-user"></i></div>
              <span className="success-profile-info">Họ và tên: {account.fullname}</span>
            </div>
            <div className="success-profile-cell">
              <div><i className="fa-solid fa-mars-and-venus"></i></div>
              <span className="success-profile-info">Giới tính: {account.gender === "M" ? "Nam" : "Nữ"}</span>
            </div>
          </div>
          <div className="success-profile-row">
            <div className="success-profile-cell">
              <div><i className="fa-solid fa-calendar-days"></i></div>
              <span className="success-profile-info">Ngày sinh: {account.birthday}</span>
            </div>
            <div className="success-profile-cell">
              <div><i className="fa-solid fa-phone"></i></div>
              <span className="success-profile-info">SĐT: {account.phone}</span>
            </div>
          </div>
        </div>

        <h4>THÔNG TIN ĐẶT LỊCH</h4>
          <div className="success-facility">
            <div className="success-facility-img">
              <img 
                src="https://dtnh.hcmulaw.edu.vn/upload/images/LOGO/health-heart-free-vector-icon-800x566.jpg" 
                alt="img-hospital" 
                width="64"
              />
            </div>
            <div>
              <div className="success-facility-name">{location.state.facility.name}</div>
              <div>{location.state.facility.location}</div>
            </div>
          </div>
          <hr />
          <div className="success-doctor">
            <div className="success-doctor-icon">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div>
              <div className="success-doctor-name">
                {location.state.doctor.degree + " " + location.state.doctor.name}
              </div>
              <div>Giới tính: {location.state.doctor.gender}</div>
              <div>Chuyên khoa: {location.state.doctor.specialist}</div>
              <div>Giá khám: {location.state.doctor.price}đ</div>
            </div>
          </div>
          <hr />
          <div className="success-datetime">
            <div className="success-datetime-icon">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div>
              <div className="success-datetime-title">Thời gian</div>
              <div>{location.state.time} ngày {selectDate.format("DD-MM-YYYY")}</div>
            </div>
          </div>
      </Card>

      <div className="success-button-box">
        <Button className="success-button" type="primary" onClick={handleClickBook}>Về trang chủ</Button>
      </div>
    </div>
  );
};

export default Success;
