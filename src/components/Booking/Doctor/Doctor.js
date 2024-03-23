import { Button, Card } from "antd";
import "./Doctor.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListDoctorBooking } from "../../../reducers/listDoctorBookingSlice";
import { RollbackOutlined } from "@ant-design/icons";

const Doctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const listDoctorBooking = useSelector((state) => state.listDoctorBooking);

  // console.log(location.state)

  useEffect(() => {
    dispatch(
      getListDoctorBooking({
        facilityID: location.state.facility.facilityID,
        specialist: location.state.specialist,
      })
    );
  }, []);

  const handleClickDoctorBooking = (doctor) => {
    navigate("/booking/datetime", {
      state: {
        doctor: doctor,
        specialist: location.state.specialist,
        facility: location.state.facility,
      },
    });
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="doctor-container">
      <div>
        <Card
          title="Thông tin đặt lịch"
          headStyle={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
          style={{ marginTop: "10rem", width: "18rem" }}
        >
          <div className="booking-info-row">
            <div className="booking-info-icon"><i className="fa-solid fa-building"></i></div>
            <span className="booking-info-content">
              Cơ sở: {location.state.facility.name}
            </span>
          </div>

          <div className="booking-info-row">
            <div className="booking-info-icon"><i className="fa-solid fa-briefcase-medical"></i></div>
            <span className="booking-info-content">
              Chuyên khoa: {location.state.specialist}
            </span>
          </div>
        </Card>
      </div>

      <div className="doctor-main">
        <Card
          title="Vui lòng chọn bác sĩ"
          headStyle={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
          style={{ width: "45rem" }}
        >
          {listDoctorBooking?.map((doctor, index) => (
            <Card
              key={index}
              className="doctor-info"
              size="small"
              onClick={() => handleClickDoctorBooking(doctor)}
            >
              <div className="doctor-info-row doctor-name">
                <div className="doctor-info-icon"><i className="fa-solid fa-user-doctor"></i></div>
                <span className="doctor-info-content">
                  {doctor.degree + " " + doctor.name}
                </span>
              </div>

              <div className="doctor-info-row">
                <div className="doctor-info-icon"><i className="fa-solid fa-mars-and-venus"></i></div>
                <span className="doctor-info-content">
                  Giới tính: {doctor.gender}
                </span>
              </div>

              <div className="doctor-info-row">
                <div className="doctor-info-icon"><i className="fa-solid fa-briefcase-medical"></i></div>
                <span className="doctor-info-content">
                  Chuyên khoa: {doctor.specialist}
                </span>
              </div>

              <div className="doctor-info-row">
                <div className="doctor-info-icon"><i className="fa-solid fa-dollar-sign"></i></div>
                <span className="doctor-info-content">
                  Giá khám: {doctor.price}đ
                </span>
              </div>
            </Card>
          ))}
        </Card>
        <div className="doctor-button-box">
          <Button
            className="doctor-button"
            icon={<RollbackOutlined />}
            onClick={handleClickBack}
          >
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
