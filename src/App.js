import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import Confirm from "./components/Booking/Confirm/Confirm";
import Datetime from "./components/Booking/Datetime/Datetime";
import Doctor from "./components/Booking/Doctor/Doctor";
import Facility from "./components/Booking/Facility/Facility";
import Specialist from "./components/Booking/Specialist/Specialist";
import Success from "./components/Booking/Success/Success";
import AdminAccountPage from "./pages/AdminAccountPage/AdminAccountPage";
import AdminFacilityPage from "./pages/AdminFacilityPage/AdminFacilityPage";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ManageAccountPage from "./pages/ManageAccountPage/ManageAccountPage";
import ManageAppointmentPage from "./pages/ManageAppointmentPage/ManageAppointmentPage";
import ManageFacilityPage from "./pages/ManageFacilityPage/ManageFacilityPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { getInfoAccount } from "./reducers/accountSlice";
import {
  getAllAppointmentAccount,
  getAllAppointmentFacility,
} from "./reducers/appointmentSlice";
import {
  getAllAccountByFacilityAndRole,
  getAllAccountByNotRole,
} from "./reducers/listAccountSlice";
import { getAllFacility } from "./reducers/listFacilitySlice";
import { serviceConfig } from "./services/serviceManager";
import { setCriteriaSearchAccount } from "./reducers/criteriaSearchAccountSlice";
import { getInfoFac } from "./reducers/facilitySlice";
import { getListSpecialist } from "./reducers/listSpecialistSlice";
import { getListDoctor } from "./reducers/listDoctorSlice";
import { Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { setCriteriaSearchFacility } from "./reducers/criteriaSearchFacilitySlice";

function App() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const criteriaSearchAccount = useSelector(
    (state) => state.criteriaSearchAccount
  );
  const criteriaSearchFacility = useSelector(
    (state) => state.criteriaSearchFacility
  );

  // console.log(account);

  useEffect(() => {
    serviceConfig();
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    const facilityID = localStorage.getItem("facilityID");
    dispatch(getAllFacility());
    dispatch(
      setCriteriaSearchFacility({
        ...criteriaSearchFacility,
        name: "",
        locationID: "",
      })
    );
    if (token) {
      dispatch(getInfoAccount({ token }));
      dispatch(getAllAppointmentAccount({ token }));
    }
    if (roleId === "2" && facilityID) {
      dispatch(getAllAppointmentFacility({ facilityID }));
    }
    if (roleId === "4" && facilityID) {
      dispatch(
        getAllAccountByFacilityAndRole({
          facilityID,
          roleId: "2",
        })
      );
      dispatch(
        setCriteriaSearchAccount({
          ...criteriaSearchAccount,
          facilityID,
          roleId: "2",
        })
      );
      dispatch(getInfoFac({ facilityID }));
      dispatch(getListSpecialist({ facilityID }));
      dispatch(getListDoctor({ facilityID }));
    }
    if (roleId === "3") {
      dispatch(
        getAllAccountByNotRole({
          roleId: "3",
        })
      );
      dispatch(
        setCriteriaSearchAccount({
          ...criteriaSearchAccount,
          accountId: "",
          roleId: "",
          facilityID: null,
        })
      );
    }
  }, []);

  const items = [
    {
      label:
        account?.roleId === "1" || !account?.roleId ? (
          <Link className="anchor-item-link" to="/booking/facility">
            Đặt lịch
          </Link>
        ) : account?.roleId === "4" ? (
          <Link className="anchor-item-link" to="/manage/facility">
            Quản lý cơ sở
          </Link>
        ) : account?.roleId === "3" ? (
          <Link className="anchor-item-link" to="/admin/facility">
            Quản lý cơ sở
          </Link>
        ) : account?.roleId === "2" ? (
          <Link className="anchor-item-link" to="/">
            Trang chủ
          </Link>
        ) : (
          ""
        ),
      key: "0",
    },
    {
      label:
        account?.roleId === "1" || !account?.roleId ? (
          <Link className="anchor-item-link" to="/appointment">
            Lịch hẹn
          </Link>
        ) : account?.roleId === "2" ? (
          <Link className="anchor-item-link" to="/manage/appointment">
            Quản lý lịch hẹn
          </Link>
        ) : account?.roleId === "4" ? (
          <Link className="anchor-item-link" to="/manage/account">
            Quản lý tài khoản
          </Link>
        ) : account?.roleId === "3" ? (
          <Link className="anchor-item-link" to="/admin/account">
            Quản lý tài khoản
          </Link>
        ) : (
          ""
        ),
      key: "1",
    },
    {
      label:
        account.fullname !== "" ? (
          <Link className="anchor-item-link" to="/proflie">
            {account.fullname}
          </Link>
        ) : (
          <Link className="anchor-item-link" to="/login">
            Đăng nhập
          </Link>
        ),
      key: "2",
    },
  ];

  return (
    <div className="App">
      <div className="header">
        <Link className="anchor-item-link app-name-box" to="/">
          <span className="app-name">ABook</span>
        </Link>

        <Dropdown
          className="app-menu"
          menu={{
            items,
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <MenuOutlined />
        </Dropdown>

        <ul className="anchor">
          <li className="anchor-item">
            <Link className="anchor-item-link" to="/">
              Trang chủ
            </Link>
          </li>

          {account?.roleId === "1" || !account?.roleId ? (
            <li className="anchor-item">
              <Link className="anchor-item-link" to="/booking/facility">
                Đặt lịch
              </Link>
            </li>
          ) : (
            ""
          )}

          {account?.roleId === "1" || !account?.roleId ? (
            <li className="anchor-item">
              <Link className="anchor-item-link" to="/appointment">
                Lịch hẹn
              </Link>
            </li>
          ) : (
            ""
          )}

          {account?.roleId === "2" ? (
            <li className="anchor-item">
              <Link className="anchor-item-link" to="/manage/appointment">
                Quản lý lịch hẹn
              </Link>
            </li>
          ) : (
            ""
          )}

          {account?.roleId === "4" ? (
            <li className="anchor-item">
              <Link className="anchor-item-link" to="/manage/facility">
                Quản lý cơ sở
              </Link>
            </li>
          ) : (
            ""
          )}

          {account?.roleId === "4" ? (
            <li className="anchor-item">
              <Link className="anchor-item-link" to="/manage/account">
                Quản lý tài khoản
              </Link>
            </li>
          ) : (
            ""
          )}

          {account?.roleId === "3" ? (
            <li className="anchor-item">
              <Link className="anchor-item-link" to="/admin/facility">
                Quản lý cơ sở
              </Link>
            </li>
          ) : (
            ""
          )}

          {account?.roleId === "3" ? (
            <li className="anchor-item">
              <Link className="anchor-item-link" to="/admin/account">
                Quản lý tài khoản
              </Link>
            </li>
          ) : (
            ""
          )}

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
        <Route path="/manage/appointment" element={<ManageAppointmentPage />} />
        <Route path="/manage/facility" element={<ManageFacilityPage />} />
        <Route path="/manage/account" element={<ManageAccountPage />} />
        <Route path="/admin/facility" element={<AdminFacilityPage />} />
        <Route path="/admin/account" element={<AdminAccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
