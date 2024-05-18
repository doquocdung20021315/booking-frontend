import { Button, Calendar, Card } from "antd";
import "./Datetime.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { RollbackOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { searchAppointment } from "../../../reducers/appointmentSlice";

const Datetime = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    if (!token || roleId !== "1" || !location.state) {
      navigate("/");
    }
  }, []);

  const [showTime, setshowTime] = useState(false);
  const [show7Time, setshow7Time] = useState(false);
  const [show8Time, setshow8Time] = useState(false);
  const [show9Time, setshow9Time] = useState(false);
  const [show10Time, setshow10Time] = useState(false);
  const [show11Time, setshow11Time] = useState(false);
  const [show13Time, setshow13Time] = useState(false);
  const [show14Time, setshow14Time] = useState(false);
  const [show15Time, setshow15Time] = useState(false);
  const [show16Time, setshow16Time] = useState(false);

  // console.log(location.state);

  const fDate = moment();
  const tDate = moment().add(12, "days");

  const validRangeDate = [dayjs(fDate.format()), dayjs(tDate.format())];

  const [selectDate, setSelectDate] = useState("");

  const onSelectDate = async (date) => {
    setSelectDate(date.format("YYYY-MM-DD"));
    if (location.state?.facility.service === "Y tế") {
      const list7 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "07:00 - 08:00",
        })
      );
      const list7acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "07:00 - 08:00",
        })
      );
      if (list7?.payload.length < 5 && list7acc?.payload.length === 0) {
        setshow7Time(true);
      } else {
        setshow7Time(false);
      }

      const list8 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "08:00 - 09:00",
        })
      );
      const list8acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "08:00 - 09:00",
        })
      );
      if (list8?.payload.length < 5 && list8acc?.payload.length === 0) {
        setshow8Time(true);
      } else {
        setshow8Time(false);
      }

      const list9 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "09:00 - 10:00",
        })
      );
      const list9acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "09:00 - 10:00",
        })
      );
      if (list9?.payload.length < 5 && list9acc?.payload.length === 0) {
        setshow9Time(true);
      } else {
        setshow9Time(false);
      }

      const list10 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "10:00 - 11:00",
        })
      );
      const list10acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "10:00 - 11:00",
        })
      );
      if (list10?.payload.length < 5 && list10acc?.payload.length === 0) {
        setshow10Time(true);
      } else {
        setshow10Time(false);
      }

      const list11 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "11:00 - 12:00",
        })
      );
      const list11acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "11:00 - 12:00",
        })
      );
      if (list11?.payload.length < 5 && list11acc?.payload.length === 0) {
        setshow11Time(true);
      } else {
        setshow11Time(false);
      }

      const list13 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "13:00 - 14:00",
        })
      );
      const list13acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "13:00 - 14:00",
        })
      );
      if (list13?.payload.length < 5 && list13acc?.payload.length === 0) {
        setshow13Time(true);
      } else {
        setshow13Time(false);
      }

      const list14 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "14:00 - 15:00",
        })
      );
      const list14acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "14:00 - 15:00",
        })
      );
      if (list14?.payload.length < 5 && list14acc?.payload.length === 0) {
        setshow14Time(true);
      } else {
        setshow14Time(false);
      }

      const list15 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "15:00 - 16:00",
        })
      );
      const list15acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "15:00 - 16:00",
        })
      );
      if (list15?.payload.length < 5 && list15acc?.payload.length === 0) {
        setshow15Time(true);
      } else {
        setshow15Time(false);
      }

      const list16 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "16:00 - 17:00",
        })
      );
      const list16acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: location.state?.doctor.doctorID,
          date: date.format("YYYY-MM-DD"),
          time: "16:00 - 17:00",
        })
      );
      if (list16?.payload.length < 5 && list16acc?.payload.length === 0) {
        setshow16Time(true);
      } else {
        setshow16Time(false);
      }
    } else if (location.state?.facility.service === "Hành chính") {
      const list7 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "07:00 - 08:00",
        })
      );
      const list7acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "07:00 - 08:00",
        })
      );
      if (list7?.payload.length < 5 && list7acc?.payload.length === 0) {
        setshow7Time(true);
      } else {
        setshow7Time(false);
      }

      const list8 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "08:00 - 09:00",
        })
      );
      const list8acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "08:00 - 09:00",
        })
      );
      if (list8?.payload.length < 5 && list8acc?.payload.length === 0) {
        setshow8Time(true);
      } else {
        setshow8Time(false);
      }

      const list9 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "09:00 - 10:00",
        })
      );
      const list9acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "09:00 - 10:00",
        })
      );
      if (list9?.payload.length < 5 && list9acc?.payload.length === 0) {
        setshow9Time(true);
      } else {
        setshow9Time(false);
      }

      const list10 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "10:00 - 11:00",
        })
      );
      const list10acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "10:00 - 11:00",
        })
      );
      if (list10?.payload.length < 5 && list10acc?.payload.length === 0) {
        setshow10Time(true);
      } else {
        setshow10Time(false);
      }

      const list11 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "11:00 - 12:00",
        })
      );
      const list11acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "11:00 - 12:00",
        })
      );
      if (list11?.payload.length < 5 && list11acc?.payload.length === 0) {
        setshow11Time(true);
      } else {
        setshow11Time(false);
      }

      const list13 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "13:00 - 14:00",
        })
      );
      const list13acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "13:00 - 14:00",
        })
      );
      if (list13?.payload.length < 5 && list13acc?.payload.length === 0) {
        setshow13Time(true);
      } else {
        setshow13Time(false);
      }

      const list14 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "14:00 - 15:00",
        })
      );
      const list14acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "14:00 - 15:00",
        })
      );
      if (list14?.payload.length < 5 && list14acc?.payload.length === 0) {
        setshow14Time(true);
      } else {
        setshow14Time(false);
      }

      const list15 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "15:00 - 16:00",
        })
      );
      const list15acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "15:00 - 16:00",
        })
      );
      if (list15?.payload.length < 5 && list15acc?.payload.length === 0) {
        setshow15Time(true);
      } else {
        setshow15Time(false);
      }

      const list16 = await dispatch(
        searchAppointment({
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "16:00 - 17:00",
        })
      );
      const list16acc = await dispatch(
        searchAppointment({
          accountId: account._id,
          facilityID: location.state?.facility.facilityID,
          specialist: location.state?.specialist,
          doctorID: "",
          date: date.format("YYYY-MM-DD"),
          time: "16:00 - 17:00",
        })
      );
      if (list16?.payload.length < 5 && list16acc?.payload.length === 0) {
        setshow16Time(true);
      } else {
        setshow16Time(false);
      }
    }
    setshowTime(true);
  };

  const handleClickTime = (value) => {
    if (location.state?.isModify) {
      if (location.state?.facility.service === "Y tế") {
        navigate("/booking/confirm", {
          state: {
            doctor: location.state?.doctor,
            specialist: location.state?.specialist,
            facility: location.state?.facility,
            date: selectDate,
            time: value,
            isModify: true,
            modifyAppointmentId: location.state?.modifyAppointmentId,
          },
        });
      } else if (location.state?.facility.service === "Hành chính") {
        navigate("/booking/confirm", {
          state: {
            specialist: location.state?.specialist,
            facility: location.state?.facility,
            date: selectDate,
            time: value,
            isModify: true,
            modifyAppointmentId: location.state?.modifyAppointmentId,
          },
        });
      }
    } else {
      if (location.state?.facility.service === "Y tế") {
        navigate("/booking/confirm", {
          state: {
            doctor: location.state?.doctor,
            specialist: location.state?.specialist,
            facility: location.state?.facility,
            date: selectDate,
            time: value,
          },
        });
      } else if (location.state?.facility.service === "Hành chính") {
        navigate("/booking/confirm", {
          state: {
            specialist: location.state?.specialist,
            facility: location.state?.facility,
            date: selectDate,
            time: value,
          },
        });
      }
    }
  };

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
          style={{ marginTop: "5rem", width: "18rem" }}
        >
          <div className="booking-info-row">
            <div className="booking-info-icon">
              <i className="fa-solid fa-building"></i>
            </div>
            <span className="booking-info-content">
              Cơ sở: {location.state?.facility.name}
            </span>
          </div>

          {location.state?.facility.service === "Y tế" ? (
            <div className="booking-info-row">
              <div className="booking-info-icon">
                <i className="fa-solid fa-briefcase-medical"></i>
              </div>
              <span className="booking-info-content">
                Chuyên khoa: {location.state?.doctor.specialist}
              </span>
            </div>
          ) : (
            <div className="booking-info-row">
              <div className="booking-info-icon">
                <i className="fa-solid fa-ticket"></i>
              </div>
              <span className="booking-info-content">
                Lĩnh vực: {location.state?.specialist}
              </span>
            </div>
          )}

          {location.state?.facility.service === "Y tế" ? (
            <div className="booking-info-row">
              <div className="booking-info-icon">
                <i className="fa-solid fa-stethoscope"></i>
              </div>
              <span className="booking-info-content">
                Bác sĩ:{" "}
                {location.state?.doctor.degree +
                  " " +
                  location.state?.doctor.name}
              </span>
            </div>
          ) : (
            ""
          )}
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
                {show7Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("07:00 - 08:00")}
                  >
                    07:00 - 08:00
                  </Button>
                ) : (
                  ""
                )}
                {show8Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("08:00 - 09:00")}
                  >
                    08:00 - 09:00
                  </Button>
                ) : (
                  ""
                )}
                {show9Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("09:00 - 10:00")}
                  >
                    09:00 - 10:00
                  </Button>
                ) : (
                  ""
                )}
                {show10Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("10:00 - 11:00")}
                  >
                    10:00 - 11:00
                  </Button>
                ) : (
                  ""
                )}
                {show11Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("11:00 - 12:00")}
                  >
                    11:00 - 12:00
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="session">
              <div className="session-title">Buổi chiều</div>
              <div className="time-booking-container">
                {show13Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("13:00 - 14:00")}
                  >
                    13:00 - 14:00
                  </Button>
                ) : (
                  ""
                )}
                {show14Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("14:00 - 15:00")}
                  >
                    14:00 - 15:00
                  </Button>
                ) : (
                  ""
                )}
                {show15Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("15:00 - 16:00")}
                  >
                    15:00 - 16:00
                  </Button>
                ) : (
                  ""
                )}
                {show16Time ? (
                  <Button
                    className="time-booking-button"
                    onClick={() => handleClickTime("16:00 - 17:00")}
                  >
                    16:00 - 17:00
                  </Button>
                ) : (
                  ""
                )}
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
