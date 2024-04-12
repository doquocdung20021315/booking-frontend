import { CalendarOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  book,
  deleteAppointmentAccount,
  searchAppointment,
} from "../../../reducers/appointmentSlice";
import "./Confirm.scss";
import { useState } from "react";
import dayjs from "dayjs";

const Confirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const account = useSelector((state) => state.account);

  // console.log(location.state);

  const [open, setOpen] = useState(false);
  const [modifyTime, setModifyTime] = useState("");

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleOk = async () => {
    if (location.state?.isModify) {
      const token = localStorage.getItem("token");
      if (token) {
        await dispatch(
          deleteAppointmentAccount({
            token,
            appointmentId: location.state?.modifyAppointmentId,
          })
        );
      }
    }

    if (location.state.facility.service === "Y tế") {
      navigate("/booking/success", {
        state: {
          doctor: location.state.doctor,
          specialist: location.state.specialist,
          facility: location.state.facility,
          date: location.state.date,
          time: modifyTime,
        },
      });
    } else if (location.state.facility.service === "Hành chính") {
      navigate("/booking/success", {
        state: {
          specialist: location.state.specialist,
          facility: location.state.facility,
          date: location.state.date,
          time: modifyTime,
        },
      });
    }
  };
  const handleCancel = async () => {
    const list = await dispatch(
      searchAppointment({
        accountId: account._id,
        facilityID: location.state.facility.facilityID,
        specialist: location.state.specialist,
        doctorID: location.state?.doctor?.doctorID
          ? location.state?.doctor?.doctorID
          : "",
        date: location.state.date,
        time: modifyTime,
      })
    );

    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(
        deleteAppointmentAccount({
          token,
          appointmentId: list?.payload[0]._id,
        })
      );
    }

    navigate(-1);
  };

  const handleClickBook = async () => {
    if (location.state.facility.service === "Y tế") {
      const list = await dispatch(
        searchAppointment({
          facilityID: location.state.facility.facilityID,
          specialist: location.state.specialist,
          doctorID: location.state.doctor.doctorID,
          date: location.state.date,
          time: location.state.time,
        })
      );
      if (list?.payload.length < 5) {
        dispatch(
          book({
            accountId: account._id,
            facilityID: location.state.facility.facilityID,
            facilityName: location.state.facility.name,
            location: location.state.facility.location,
            locationID: location.state.facility.locationID,
            service: location.state.facility.service,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            doctorName: location.state.doctor.name,
            doctorDegree: location.state.doctor.degree,
            doctorGender: location.state.doctor.gender,
            doctorPrice: location.state.doctor.price,
            date: location.state.date,
            time: location.state.time,
          })
        );

        if (location.state?.isModify) {
          const token = localStorage.getItem("token");
          if (token) {
            await dispatch(
              deleteAppointmentAccount({
                token,
                appointmentId: location.state?.modifyAppointmentId,
              })
            );
          }
        }

        navigate("/booking/success", {
          state: {
            doctor: location.state.doctor,
            specialist: location.state.specialist,
            facility: location.state.facility,
            date: location.state.date,
            time: location.state.time,
          },
        });
      } else {
        const list7 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "07:00 - 08:00",
          })
        );
        const list8 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "08:00 - 09:00",
          })
        );
        const list9 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "09:00 - 10:00",
          })
        );
        const list10 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "10:00 - 11:00",
          })
        );
        const list11 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "11:00 - 12:00",
          })
        );
        const list13 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "13:00 - 14:00",
          })
        );
        const list14 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "14:00 - 15:00",
          })
        );
        const list15 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "15:00 - 16:00",
          })
        );
        const list16 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: location.state.doctor.doctorID,
            date: location.state.date,
            time: "16:00 - 17:00",
          })
        );

        if (
          location.state.time !== "07:00 - 08:00" &&
          list7?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "07:00 - 08:00",
            })
          );
          setModifyTime("07:00 - 08:00");
        } else if (
          location.state.time !== "08:00 - 09:00" &&
          list8?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "08:00 - 09:00",
            })
          );
          setModifyTime("08:00 - 09:00");
        } else if (
          location.state.time !== "09:00 - 10:00" &&
          list9?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "09:00 - 10:00",
            })
          );
          setModifyTime("09:00 - 10:00");
        } else if (
          location.state.time !== "10:00 - 11:00" &&
          list10?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "10:00 - 11:00",
            })
          );
          setModifyTime("10:00 - 11:00");
        } else if (
          location.state.time !== "11:00 - 12:00" &&
          list11?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "11:00 - 12:00",
            })
          );
          setModifyTime("11:00 - 12:00");
        } else if (
          location.state.time !== "13:00 - 14:00" &&
          list13?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "13:00 - 14:00",
            })
          );
          setModifyTime("13:00 - 14:00");
        } else if (
          location.state.time !== "14:00 - 15:00" &&
          list14?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "14:00 - 15:00",
            })
          );
          setModifyTime("14:00 - 15:00");
        } else if (
          location.state.time !== "15:00 - 16:00" &&
          list15?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "15:00 - 16:00",
            })
          );
          setModifyTime("15:00 - 16:00");
        } else if (
          location.state.time !== "16:00 - 17:00" &&
          list16?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: location.state.doctor.doctorID,
              doctorName: location.state.doctor.name,
              doctorDegree: location.state.doctor.degree,
              doctorGender: location.state.doctor.gender,
              doctorPrice: location.state.doctor.price,
              date: location.state.date,
              time: "16:00 - 17:00",
            })
          );
          setModifyTime("16:00 - 17:00");
        }
        setOpen(true);
      }
    } else if (location.state.facility.service === "Hành chính") {
      const list = await dispatch(
        searchAppointment({
          facilityID: location.state.facility.facilityID,
          specialist: location.state.specialist,
          doctorID: "",
          date: location.state.date,
          time: location.state.time,
        })
      );
      if (list?.payload.length < 5) {
        dispatch(
          book({
            accountId: account._id,
            facilityID: location.state.facility.facilityID,
            facilityName: location.state.facility.name,
            location: location.state.facility.location,
            locationID: location.state.facility.locationID,
            service: location.state.facility.service,
            specialist: location.state.specialist,
            doctorID: "",
            doctorName: "",
            doctorDegree: "",
            doctorGender: "",
            doctorPrice: "",
            date: location.state.date,
            time: location.state.time,
          })
        );

        if (location.state?.isModify) {
          const token = localStorage.getItem("token");
          if (token) {
            await dispatch(
              deleteAppointmentAccount({
                token,
                appointmentId: location.state?.modifyAppointmentId,
              })
            );
          }
        }

        navigate("/booking/success", {
          state: {
            specialist: location.state.specialist,
            facility: location.state.facility,
            date: location.state.date,
            time: location.state.time,
          },
        });
      } else {
        const list7 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "07:00 - 08:00",
          })
        );
        const list8 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "08:00 - 09:00",
          })
        );
        const list9 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "09:00 - 10:00",
          })
        );
        const list10 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "10:00 - 11:00",
          })
        );
        const list11 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "11:00 - 12:00",
          })
        );
        const list13 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "13:00 - 14:00",
          })
        );
        const list14 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "14:00 - 15:00",
          })
        );
        const list15 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "15:00 - 16:00",
          })
        );
        const list16 = await dispatch(
          searchAppointment({
            facilityID: location.state.facility.facilityID,
            specialist: location.state.specialist,
            doctorID: "",
            date: location.state.date,
            time: "16:00 - 17:00",
          })
        );

        if (
          location.state.time !== "07:00 - 08:00" &&
          list7?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "07:00 - 08:00",
            })
          );
          setModifyTime("07:00 - 08:00");
        } else if (
          location.state.time !== "08:00 - 09:00" &&
          list8?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "08:00 - 09:00",
            })
          );
          setModifyTime("08:00 - 09:00");
        } else if (
          location.state.time !== "09:00 - 10:00" &&
          list9?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "09:00 - 10:00",
            })
          );
          setModifyTime("09:00 - 10:00");
        } else if (
          location.state.time !== "10:00 - 11:00" &&
          list10?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "10:00 - 11:00",
            })
          );
          setModifyTime("10:00 - 11:00");
        } else if (
          location.state.time !== "11:00 - 12:00" &&
          list11?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "11:00 - 12:00",
            })
          );
          setModifyTime("11:00 - 12:00");
        } else if (
          location.state.time !== "13:00 - 14:00" &&
          list13?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "13:00 - 14:00",
            })
          );
          setModifyTime("13:00 - 14:00");
        } else if (
          location.state.time !== "14:00 - 15:00" &&
          list14?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "14:00 - 15:00",
            })
          );
          setModifyTime("14:00 - 15:00");
        } else if (
          location.state.time !== "15:00 - 16:00" &&
          list15?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "15:00 - 16:00",
            })
          );
          setModifyTime("15:00 - 16:00");
        } else if (
          location.state.time !== "16:00 - 17:00" &&
          list16?.payload.length < 5
        ) {
          dispatch(
            book({
              accountId: account._id,
              facilityID: location.state.facility.facilityID,
              facilityName: location.state.facility.name,
              location: location.state.facility.location,
              locationID: location.state.facility.locationID,
              service: location.state.facility.service,
              specialist: location.state.specialist,
              doctorID: "",
              doctorName: "",
              doctorDegree: "",
              doctorGender: "",
              doctorPrice: "",
              date: location.state.date,
              time: "16:00 - 17:00",
            })
          );
          setModifyTime("16:00 - 17:00");
        }
        setOpen(true);
      }
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
                <div>
                  <i className="fa-solid fa-user"></i>
                </div>
                <span className="confirm-profile-info">
                  Họ và tên: {account.fullname}
                </span>
              </div>
              <div className="confirm-profile-cell">
                <div>
                  <i className="fa-solid fa-mars-and-venus"></i>
                </div>
                <span className="confirm-profile-info">
                  Giới tính: {account.gender}
                </span>
              </div>
            </div>
            <div className="confirm-profile-row">
              <div className="confirm-profile-cell">
                <div>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <span className="confirm-profile-info">
                  Ngày sinh: {account.birthday}
                </span>
              </div>
              <div className="confirm-profile-cell">
                <div>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <span className="confirm-profile-info">
                  SĐT: {account.phone}
                </span>
              </div>
            </div>
            <div className="confirm-profile-row">
              <div className="confirm-profile-cell">
                <div>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <span className="confirm-profile-info">
                  Email: {account.email}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {location.state.facility.service === "Y tế" ? (
          <Card
            className="confirm-doctor"
            title="Thông tin bác sĩ"
            headStyle={{
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            <div className="confirm-doctor-row">
              <div className="confirm-doctor-cell">
                <div className="confirm-doctor-icon">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <span className="confirm-doctor-info">
                  {location.state.doctor.degree +
                    " " +
                    location.state.doctor.name}
                </span>
              </div>

              <div className="confirm-doctor-cell">
                <div className="confirm-doctor-icon">
                  <i className="fa-solid fa-mars-and-venus"></i>
                </div>
                <span className="confirm-doctor-info">
                  Giới tính: {location.state.doctor.gender}
                </span>
              </div>
            </div>

            <div className="confirm-doctor-row">
              <div className="confirm-doctor-cell">
                <div className="confirm-doctor-icon">
                  <i className="fa-solid fa-briefcase-medical"></i>
                </div>
                <span className="confirm-doctor-info">
                  Chuyên khoa: {location.state.doctor.specialist}
                </span>
              </div>

              <div className="confirm-doctor-cell">
                <div className="confirm-doctor-icon">
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <span className="confirm-doctor-info">
                  Giá khám: {location.state.doctor.price}đ
                </span>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="confirm-facility">
              <div className="confirm-facility-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4_3kqoCf3mzByz9BAD-iljhvMCU4W8EbQdQ&usqp=CAU"
                  alt="img-administrative"
                  width="64"
                />
              </div>
              <div>
                <div className="confirm-facility-name">
                  {location.state.facility.name}
                </div>
                <div className="confirm-facility-location">
                  {location.state.facility.location}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="confirm-row">
          {location.state.facility.service === "Y tế" ? (
            <Card>
              <div className="confirm-facility">
                <div className="confirm-facility-img">
                  <img
                    src="https://dtnh.hcmulaw.edu.vn/upload/images/LOGO/health-heart-free-vector-icon-800x566.jpg"
                    alt="img-hospital"
                    width="64"
                  />
                </div>
                <div>
                  <div className="confirm-facility-name">
                    {location.state.facility.name}
                  </div>
                  <div className="confirm-facility-location">
                    {location.state.facility.location}
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="confirm-specialist">
                <div className="confirm-specialist-icon">
                  <i className="fa-solid fa-ticket"></i>
                </div>
                <div>
                  <div className="confirm-specialist-title">Lĩnh vực</div>
                  <div className="confirm-specialist-content">
                    {location.state.specialist}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="confirm-datetime-card">
            <div className="confirm-datetime">
              <div className="confirm-datetime-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <div className="confirm-datetime-title">Thời gian</div>
                <div className="confirm-datetime-content">
                  {location.state.time} ngày{" "}
                  {dayjs(location.state.date, "YYYY-MM-DD").format(
                    "DD-MM-YYYY"
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="confirm-button-box">
          <Button
            className="confirm-button"
            icon={<RollbackOutlined />}
            onClick={handleClickBack}
          >
            Quay lại
          </Button>
          <Button
            className="confirm-button"
            icon={<CalendarOutlined />}
            onClick={handleClickBook}
          >
            Đặt lịch
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        title="Khung giờ này đã hết chỗ"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại chọn ngày giờ
          </Button>,
          <Button key="confirm" type="primary" onClick={handleOk}>
            Đồng ý
          </Button>,
        ]}
      >
        <p>
          Vô cùng xin lỗi quý khách, khung giờ này vừa mới hết chỗ. Chúng tôi sẽ
          đổi lịch hẹn của bạn sang khung giờ {modifyTime}. Bạn có muốn đổi
          không?
        </p>
      </Modal>
    </div>
  );
};

export default Confirm;
