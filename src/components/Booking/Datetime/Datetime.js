import { Button, Calendar, Card } from "antd";
import "./Datetime.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { RollbackOutlined } from "@ant-design/icons";

const Datetime = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showTime, setshowTime] = useState(false);

  // console.log(location.state);

  const fDate = moment();
  const tDate = moment().add(12, "days");

  const validRangeDate = [dayjs(fDate.format()), dayjs(tDate.format())];

  const [selectDate, setSelectDate] = useState("");

  const onSelectDate = (date) => {
    setSelectDate(date.format("DD-MM-YYYY"));
    setshowTime(true);
  };

  const handleClickTime = (value) => {
    if (location.state.facility.service === "Y tế") {
      navigate("/booking/confirm", {
        state: {
          doctor: location.state.doctor,
          specialist: location.state.specialist,
          facility: location.state.facility,
          date: selectDate,
          time: value,
        },
      });
    } else if (location.state.facility.service === "Hành chính") {
      navigate("/booking/confirm", {
        state: {
          specialist: location.state.specialist,
          facility: location.state.facility,
          date: selectDate,
          time: value,
        },
      });
    }
  }

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="datetime-container">
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

          {location.state.facility.service === "Y tế"
            ? <div className="booking-info-row">
                <div className="booking-info-icon"><i className="fa-solid fa-briefcase-medical"></i></div>
                <span className="booking-info-content">
                  Chuyên khoa: {location.state.doctor.specialist}
                </span>
              </div>
            : <div className="booking-info-row">
                <div className="booking-info-icon"><i className="fa-solid fa-ticket"></i></div>
                <span className="booking-info-content">
                  Lĩnh vực: {location.state.specialist}
                </span>
              </div>}

          {location.state.facility.service === "Y tế" 
            ? <div className="booking-info-row">
                <div className="booking-info-icon"><i className="fa-solid fa-stethoscope"></i></div>
                <span className="booking-info-content">
                  Bác sĩ: {location.state.doctor.degree + " " + location.state.doctor.name}
                </span>
              </div> 
            : ""}
        </Card>
      </div>

      <div className="datetime-main">
        <Card
          title="Vui lòng chọn lịch hẹn"
          headStyle={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
          style={{ width: "45rem" }}
        >
          <Calendar
            fullscreen={false}
            validRange={validRangeDate}
            onSelect={onSelectDate}
          />
        </Card>
        {showTime ? (
          <div>
            <div className="session">
              <div className="session-title">Buổi sáng</div>
              <div className="time-booking-container">
                <Button className="time-booking-button" onClick={() => handleClickTime("07:00 - 08:00")}>07:00 - 08:00</Button>
                <Button className="time-booking-button" onClick={() => handleClickTime("08:00 - 09:00")}>08:00 - 09:00</Button>
                <Button className="time-booking-button" onClick={() => handleClickTime("09:00 - 10:00")}>09:00 - 10:00</Button>
                <Button className="time-booking-button" onClick={() => handleClickTime("10:00 - 11:00")}>10:00 - 11:00</Button>
                <Button className="time-booking-button" onClick={() => handleClickTime("11:00 - 12:00")}>11:00 - 12:00</Button>
              </div>
            </div>
            <div className="session">
              <div className="session-title">Buổi chiều</div>
              <div className="time-booking-container">
                <Button className="time-booking-button" onClick={() => handleClickTime("13:00 - 14:00")}>13:00 - 14:00</Button>
                <Button className="time-booking-button" onClick={() => handleClickTime("14:00 - 15:00")}>14:00 - 15:00</Button>
                <Button className="time-booking-button" onClick={() => handleClickTime("15:00 - 16:00")}>15:00 - 16:00</Button>
                <Button className="time-booking-button" onClick={() => handleClickTime("16:00 - 17:00")}>16:00 - 17:00</Button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="datetime-button-box">
          <Button
            className="datetime-button"
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

export default Datetime;
