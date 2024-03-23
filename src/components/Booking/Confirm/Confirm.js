import { CalendarOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { book } from "../../../reducers/appointmentSlice";
import "./Confirm.scss";

const Confirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const account = useSelector((state) => state.account);

  // console.log(location.state);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickBook = () => {
    if (location.state.facility.service === "Y tế") {
      dispatch(book({
        doctor: location.state.doctor,
        accountId: account._id,
        specialist: location.state.specialist,
        facility: location.state.facility,
        date: location.state.date,
        time: location.state.time,
      }));
      navigate("/booking/success", {
        state: {
          doctor: location.state.doctor,
          specialist: location.state.specialist,
          facility: location.state.facility,
          date: location.state.date,
          time: location.state.time,
        },
      });
    } else if (location.state.facility.service === "Hành chính") {
      dispatch(book({
        doctor: "",
        accountId: account._id,
        specialist: location.state.specialist,
        facility: location.state.facility,
        date: location.state.date,
        time: location.state.time,
      }));
      navigate("/booking/success", {
        state: {
          specialist: location.state.specialist,
          facility: location.state.facility,
          date: location.state.date,
          time: location.state.time,
        },
      });
    }
  };

  return (
    <div className="confirm-container">
      <div className="confirm-box">
        <div className="confirm-title">Vui lòng xác nhận thông tin</div>

        <Card
          className="confirm-profile"
          title="Thông tin cá nhân"
          headStyle={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          <div>
            <div className="confirm-profile-row">
              <div className="confirm-profile-cell">
                <div><i className="fa-solid fa-user"></i></div>
                <span className="confirm-profile-info">Họ và tên: {account.fullname}</span>
              </div>
              <div className="confirm-profile-cell">
                <div><i className="fa-solid fa-mars-and-venus"></i></div>
                <span className="confirm-profile-info">Giới tính: {account.gender}</span>
              </div>
            </div>
            <div className="confirm-profile-row">
              <div className="confirm-profile-cell">
                <div><i className="fa-solid fa-calendar-days"></i></div>
                <span className="confirm-profile-info">Ngày sinh: {account.birthday}</span>
              </div>
              <div className="confirm-profile-cell">
                <div><i className="fa-solid fa-phone"></i></div>
                <span className="confirm-profile-info">SĐT: {account.phone}</span>
              </div>
            </div>
          </div>
        </Card>

        {location.state.facility.service === "Y tế"
          ? <Card
              className="confirm-doctor"
              title="Thông tin bác sĩ"
              headStyle={{
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              <div className="confirm-doctor-row">
                <div className="confirm-doctor-cell">
                  <div className="confirm-doctor-icon"><i className="fa-solid fa-user-doctor"></i></div>
                  <span className="confirm-doctor-info">
                    {location.state.doctor.degree + " " + location.state.doctor.name}
                  </span>
                </div>

                <div className="confirm-doctor-cell">
                  <div className="confirm-doctor-icon"><i className="fa-solid fa-mars-and-venus"></i></div>
                  <span className="confirm-doctor-info">
                    Giới tính: {location.state.doctor.gender}
                  </span>
                </div>
              </div>

              <div className="confirm-doctor-row">
                <div className="confirm-doctor-cell">
                  <div className="confirm-doctor-icon"><i className="fa-solid fa-briefcase-medical"></i></div>
                  <span className="confirm-doctor-info">
                    Chuyên khoa: {location.state.doctor.specialist}
                  </span>
                </div>

                <div className="confirm-doctor-cell">
                  <div className="confirm-doctor-icon"><i className="fa-solid fa-dollar-sign"></i></div>
                  <span className="confirm-doctor-info">
                    Giá khám: {location.state.doctor.price}đ
                  </span>
                </div>
              </div>
            </Card>
          : <Card>
              <div className="confirm-facility">
                <div className="confirm-facility-img">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4_3kqoCf3mzByz9BAD-iljhvMCU4W8EbQdQ&usqp=CAU" 
                    alt="img-administrative" 
                    width="64"
                  />
                </div>
                <div>
                  <div className="confirm-facility-name">{location.state.facility.name}</div>
                  <div className="confirm-facility-location">{location.state.facility.location}</div>
                </div>
              </div>
            </Card>}

        <div className="confirm-row">
          {location.state.facility.service === "Y tế"
            ? <Card>
                <div className="confirm-facility">
                  <div className="confirm-facility-img">
                    <img 
                      src="https://dtnh.hcmulaw.edu.vn/upload/images/LOGO/health-heart-free-vector-icon-800x566.jpg" 
                      alt="img-hospital" 
                      width="64"
                    />
                  </div>
                  <div>
                    <div className="confirm-facility-name">{location.state.facility.name}</div>
                    <div className="confirm-facility-location">{location.state.facility.location}</div>
                  </div>
                </div>
              </Card>
            : <Card>
                <div className="confirm-specialist">
                  <div className="confirm-specialist-icon">
                    <i className="fa-solid fa-ticket"></i>
                  </div>
                  <div>
                    <div className="confirm-specialist-title">Lĩnh vực</div>
                    <div className="confirm-specialist-content">{location.state.specialist}</div>
                  </div>
                </div>
              </Card>}

          <Card className="confirm-datetime-card">
            <div className="confirm-datetime">
              <div className="confirm-datetime-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <div className="confirm-datetime-title">Thời gian</div>
                <div className="confirm-datetime-content">{location.state.time} ngày {location.state.date}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="confirm-button-box">
          <Button className="confirm-button" icon={<RollbackOutlined />} onClick={handleClickBack}>Quay lại</Button>
          <Button className="confirm-button" icon={<CalendarOutlined />} onClick={handleClickBook}>Đặt lịch</Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
