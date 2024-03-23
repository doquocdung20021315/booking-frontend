import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import Datetime from "./components/Booking/Datetime/Datetime";
import Doctor from "./components/Booking/Doctor/Doctor";
import Specialist from "./components/Booking/Specialist/Specialist";
import logo from "./logo.svg";
import BookingPage from "./pages/BookingPage/BookingPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { getInfoAccount } from "./reducers/accountSlice";
import { serviceConfig } from "./services/serviceManager";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import Facility from "./components/Booking/Facility/Facility";
import { getAllFacility } from "./reducers/listFacilitySlice";
import Confirm from "./components/Booking/Confirm/Confirm";
import Success from "./components/Booking/Success/Success";
import { getAllAppointmentAccount } from "./reducers/appointmentSlice";

function App() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  // console.log(account);

  useEffect(() => {
    serviceConfig();
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getInfoAccount({ token }));
      dispatch(getAllAppointmentAccount({ token }));
    }
    dispatch(getAllFacility());
  }, []);

  return (
    <div className="App">
      <div className="header">
        <Link to="/">
          <img src={logo} alt="logo" height="100%" />
        </Link>
        <ul className="anchor">
          <li className="anchor-item">
            <Link className="anchor-item-link" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="anchor-item">
            <Link className="anchor-item-link" to="/booking/facility">
              Đặt lịch
            </Link>
          </li>
          <li className="anchor-item">
            <Link className="anchor-item-link" to="/appointment">
              Lịch hẹn
            </Link>
          </li>
          <li className="anchor-item">
            {account.fullname !== "" ? (
              <Link className="anchor-item-link" to="/proflie">
                {account.fullname}
              </Link>
            ) : (
              <Link className="anchor-item-link" to="/login">
                Đăng nhập
              </Link>
            )}
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />}>
          <Route path="facility" element={<Facility />} />
          <Route path="specialist" element={<Specialist />} />
          <Route path="doctor" element={<Doctor />} />
          <Route path="datetime" element={<Datetime />} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="success" element={<Success />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/proflie" element={<ProfilePage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
      </Routes>
    </div>
  );
}

export default App;
