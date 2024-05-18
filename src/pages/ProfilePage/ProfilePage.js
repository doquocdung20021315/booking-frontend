import { Button, DatePicker, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getInfoAccount,
  setLogin,
  updateInfoAccount,
} from "../../reducers/accountSlice";
import "../../components/ProfilePage/ProfilePage.scss";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getInfoAccount({ token }));
    } else {
      navigate("/");
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState(account.fullname);
  const [birthday, setBirthday] = useState(account.birthday);
  const [gender, setGender] = useState(account.gender);
  const [phone, setPhone] = useState(account.phone);
  const [email, setEmail] = useState(account.email);

  const [openPass, setOpenPass] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");

  const handleClickUpdate = () => {
    setFullname(account.fullname);
    setBirthday(account.birthday);
    setGender(account.gender);
    setPhone(account.phone);
    setEmail(account.email);
    setOpen(true);
  };

  const handleOk = () => {
    const token = localStorage.getItem("token");
    dispatch(
      updateInfoAccount({
        token,
        fullname,
        birthday,
        gender,
        phone,
        email,
      })
    );
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleChangeFullname = (e) => {
    setFullname(e.target.value);
  };

  const handleChangeBirthday = (value) => {
    setBirthday(value.format("DD-MM-YYYY"));
  };

  const handleChangeGender = (value) => {
    setGender(value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleClickPass = () => {
    setOldPass("");
    setNewPass("");
    setRePass("");
    const errorMessage = document.getElementById("error-message-modify-pass");
    errorMessage?.classList.remove("error-message-modify-pass-block");
    setOpenPass(true);
  };

  const handleOkPass = () => {
    if (oldPass === account.password) {
      if (newPass === rePass) {
        const token = localStorage.getItem("token");
        dispatch(
          updateInfoAccount({
            token,
            password: newPass,
          })
        );
        setOpenPass(false);
      } else {
        const errorMessage = document.getElementById("error-message-modify-pass");
        errorMessage?.classList.add("error-message-modify-pass-block");
      }
    } else {
      const errorMessage = document.getElementById("error-message-modify-pass");
      errorMessage?.classList.add("error-message-modify-pass-block");
    }
  };

  const handleCancelPass = () => {
    setOpenPass(false);
  };

  const handleChangeOldPass = (e) => {
    setOldPass(e.target.value);
  };

  const handleChangeNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleChangeRePass = (e) => {
    setRePass(e.target.value);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    const facilityID = localStorage.getItem("facilityID");
    if (facilityID) {
      localStorage.removeItem("facilityID");
    }
    dispatch(
      setLogin({
        birthday: "",
        fullname: "",
        gender: "",
        phone: "",
        email: "",
        username: "",
        _id: "",
      })
    );
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-img">
        <i className="fa-solid fa-circle-user"></i>
      </div>

      <div className="profile-row">
        <div className="profile-label">Họ và tên</div>
        <div className="profile-content">{account.fullname}</div>
      </div>

      <div className="profile-row profile-birthday-gender">
        <div className="profile-birthday">
          <div className="profile-label">Ngày sinh</div>
          <div className="profile-content">{account.birthday}</div>
        </div>
        <div className="profile-gender">
          <div className="profile-label">Giới tính</div>
          <div className="profile-content">{account.gender}</div>
        </div>
      </div>

      <div className="profile-row">
        <div className="profile-label">Số điện thoại</div>
        <div className="profile-content">{account.phone}</div>
      </div>

      <div className="profile-row">
        <div className="profile-label">Email</div>
        <div className="profile-content">{account.email}</div>
      </div>

      <div className="profile-button-box">
        <Button
          className="profile-button"
          type="primary"
          onClick={handleClickUpdate}
        >
          Cập nhật
        </Button>
        <Button
          className="profile-button"
          type="primary"
          onClick={handleClickPass}
        >
          Đổi mật khẩu
        </Button>
        <Button className="profile-button" onClick={handleClickLogout}>
          Đăng xuất
        </Button>
      </div>

      <Modal
        className="profile-update-modal"
        open={open}
        title="Cập nhật thông tin cá nhân"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại
          </Button>,
          <Button key="update" type="primary" onClick={handleOk}>
            Cập nhật
          </Button>,
        ]}
      >
        <div className="profile-update-row">
          <div className="profile-update-label">Họ và tên</div>
          <Input
            className="profile-update-input"
            value={fullname}
            placeholder="Nhập họ và tên"
            onChange={handleChangeFullname}
          />
        </div>

        <div className="profile-update-row profile-update-birthday-gender">
          <div className="profile-update-birthday">
            <div className="profile-update-label">Ngày sinh</div>
            <DatePicker
              className="profile-update-input"
              allowClear={false}
              format="DD-MM-YYYY"
              value={dayjs(birthday, "DD-MM-YYYY")}
              placeholder="Chọn ngày sinh"
              onChange={handleChangeBirthday}
            />
          </div>

          <div className="profile-update-gender">
            <div className="profile-update-label">Giới tính</div>
            <Select
              className="profile-update-input"
              value={gender}
              placeholder="Chọn giới tính"
              options={[
                {
                  value: "Nam",
                  label: "Nam",
                },
                {
                  value: "Nữ",
                  label: "Nữ",
                },
              ]}
              onChange={handleChangeGender}
            />
          </div>
        </div>

        <div className="profile-update-row">
          <div className="profile-update-label">Số điện thoại</div>
          <Input
            className="profile-update-input"
            value={phone}
            placeholder="Nhập số điện thoại"
            onChange={handleChangePhone}
          />
        </div>

        <div className="profile-update-row">
          <div className="profile-update-label">Email</div>
          <Input
            className="profile-update-input"
            value={email}
            placeholder="Nhập email"
            onChange={handleChangeEmail}
          />
        </div>
      </Modal>

      <Modal
        className="profile-update-modal"
        open={openPass}
        title="Đổi mật khẩu"
        onOk={handleOkPass}
        onCancel={handleCancelPass}
        footer={[
          <Button key="back" onClick={handleCancelPass}>
            Quay lại
          </Button>,
          <Button key="update" type="primary" onClick={handleOkPass}>
            Cập nhật
          </Button>,
        ]}
      >
        <div className="profile-update-row">
          <div className="profile-update-label">Mật khẩu cũ</div>
          <Input.Password
            className="profile-update-input"
            value={oldPass}
            placeholder="Nhập mật khẩu cũ"
            onChange={handleChangeOldPass}
          />
        </div>

        <div className="profile-update-row">
          <div className="profile-update-label">Mật khẩu mới</div>
          <Input.Password
            className="profile-update-input"
            value={newPass}
            placeholder="Nhập mật khẩu mới"
            onChange={handleChangeNewPass}
          />
        </div>

        <div className="profile-update-row">
          <div className="profile-update-label">Nhập lại mật khẩu mới</div>
          <Input.Password
            className="profile-update-input"
            value={rePass}
            placeholder="Nhập lại mật khẩu mới"
            onChange={handleChangeRePass}
          />
        </div>

        <div id="error-message-modify-pass">
          Vui lòng kiểm tra lại mật khẩu
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
