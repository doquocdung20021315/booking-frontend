import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../components/RegisterPage/RegisterPage.scss";
import { authenticate, register } from "../../reducers/accountSlice";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const [authenticateModal, setAuthenticateModal] = useState(false);

  const [authenticateId, setAuthenticateId] = useState("");
  const [formValues, setFormValues] = useState(null);

  const onFinish = async (values) => {
    setFormValues(values);
    if (values.password === values.passwordConfirm) {
      const { payload } = await dispatch(
        register({
          username: values.username,
          password: values.password,
          fullname: values.fullname,
          birthday: values.birthday.format("DD-MM-YYYY"),
          gender: values.gender,
          phone: values.phone,
          email: values.email,
        })
      );

      if (payload.message === "Người dùng đã tồn tại") {
        const errorMessage = document.getElementById("error-message");
        const eMessage = document.createElement("div");
        eMessage.classList.add("error-message");
        eMessage.innerHTML = `
        <div class='error-icon'>x</div>
        <div>Tên tài khoản đã tồn tại</div>
        `;
        errorMessage?.appendChild(eMessage);
        setTimeout(() => {
          errorMessage?.removeChild(eMessage);
        }, 3000);
      }

      if (payload.message === "Đã gửi mã xác thực") {
        setAuthenticateModal(true);
        setAuthenticateId("");
      }
    } else {
      const errorMessage = document.getElementById("error-message");
      const eMessage = document.createElement("div");
      eMessage.classList.add("error-message");
      eMessage.innerHTML = `
      <div class='error-icon'>x</div>
      <div>Xin quý khách xác nhận lại mật khẩu</div>
      `;
      errorMessage?.appendChild(eMessage);
      setTimeout(() => {
        errorMessage?.removeChild(eMessage);
      }, 3000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Lỗi:', errorInfo);
  };

  const handleChangeAuthenticateId = (e) => {
    setAuthenticateId(e.target.value);
  };

  const handleOkAuthenticateModal = async () => {
    const { payload } = await dispatch(
      authenticate({
        authenId: authenticateId,
      })
    );

    if (payload.message === "Mã xác thực không đúng") {
      const errorMessage = document.getElementById("error-message");
      const eMessage = document.createElement("div");
      eMessage.classList.add("error-message");
      eMessage.innerHTML = `
      <div class='error-icon'>x</div>
      <div>Mã xác thực không đúng</div>
      `;
      errorMessage?.appendChild(eMessage);
      setTimeout(() => {
        errorMessage?.removeChild(eMessage);
      }, 3000);
    }

    if (payload.message === "Xác thực thành công") {
      navigate("/login");
    }

    setAuthenticateModal(false);
  };

  const handleCancelAuthenticateModal = () => {
    setAuthenticateModal(false);
  };

  const handleReSend = async () => {
    await dispatch(
      register({
        username: formValues?.username,
        password: formValues?.password,
        fullname: formValues?.fullname,
        birthday: formValues?.birthday.format("DD-MM-YYYY"),
        gender: formValues?.gender,
        phone: formValues?.phone,
        email: formValues?.email,
      })
    );
  };

  return (
    <div className="register-page">
      <div id="error-message" />
      <Form
        className="register-form"
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="register-name">ĐĂNG KÝ TÀI KHOẢN</div>

        <div className="register-label">
          <span>Tài khoản</span>
          <span>
            {" "}
            (<span className="star">*</span>){" "}
          </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="username"
          rules={[
            { required: true, message: "Hãy nhập tên tài khoản của bạn!" },
          ]}
        >
          <Input className="register-input" placeholder="Nhập tên tài khoản" />
        </Form.Item>

        <div className="register-label">
          <span>Mật khẩu</span>
          <span>
            {" "}
            (<span className="star">*</span>){" "}
          </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="password"
          rules={[{ required: true, message: "Hãy nhập mật khẩu của bạn!" }]}
        >
          <Input.Password
            className="register-input"
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>

        <div className="register-label">
          <span>Xác nhận mật khẩu</span>
          <span>
            {" "}
            (<span className="star">*</span>){" "}
          </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="passwordConfirm"
          rules={[
            { required: true, message: "Hãy xác nhận mật khẩu của bạn!" },
          ]}
        >
          <Input.Password
            className="register-input"
            placeholder="Xác nhận mật khẩu"
          />
        </Form.Item>

        <div className="register-label">
          <span>Họ và tên</span>
          <span>
            {" "}
            (<span className="star">*</span>){" "}
          </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="fullname"
          rules={[{ required: true, message: "Hãy nhập họ và tên của bạn!" }]}
        >
          <Input className="register-input" placeholder="Nhập họ và tên" />
        </Form.Item>

        <div className="register-birthday-gender">
          <div className="register-birthday">
            <div className="register-label">
              <span>Ngày sinh</span>
              <span>
                {" "}
                (<span className="star">*</span>){" "}
              </span>
            </div>
            <Form.Item
              className="register-form-item"
              name="birthday"
              rules={[
                { required: true, message: "Hãy nhập ngày sinh của bạn!" },
              ]}
            >
              <DatePicker format="DD-MM-YYYY" placeholder="Chọn ngày sinh" />
            </Form.Item>
          </div>

          <div className="register-gender">
            <div className="register-label">
              <span>Giới tính</span>
              <span>
                {" "}
                (<span className="star">*</span>){" "}
              </span>
            </div>
            <Form.Item
              className="register-form-item"
              name="gender"
              rules={[
                { required: true, message: "Hãy nhập giới tính của bạn!" },
              ]}
            >
              <Select
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
              />
            </Form.Item>
          </div>
        </div>

        <div className="register-label">
          <span>Số điện thoại</span>
          <span>
            {" "}
            (<span className="star">*</span>){" "}
          </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="phone"
          rules={[
            { required: true, message: "Hãy nhập số điện thoại của bạn!" },
          ]}
        >
          <Input className="register-input" placeholder="Nhập số điện thoại" />
        </Form.Item>

        <div className="register-label">
          <span>Email</span>
          <span>
            {" "}
            (<span className="star">*</span>){" "}
          </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="email"
          rules={[
            { required: true, message: "Hãy nhập email của bạn!" },
            { type: "email", message: "Email không đúng định dạng!" },
          ]}
        >
          <Input className="register-input" placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          className="register-form-item"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button className="register-button" type="primary" htmlType="submit">
            ĐĂNG KÝ
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Xác thực tài khoản"
        open={authenticateModal}
        onOk={handleOkAuthenticateModal}
        onCancel={handleCancelAuthenticateModal}
        footer={[
          <Button key="back" onClick={handleCancelAuthenticateModal}>
            Quay lại
          </Button>,
          <Button key="resend" onClick={handleReSend}>
            Gửi lại mã xác thực
          </Button>,
          <Button
            key="authenticate"
            type="primary"
            onClick={handleOkAuthenticateModal}
          >
            Xác thực
          </Button>,
        ]}
      >
        <div>Mã xác thực đã được gửi đến email đã đăng ký.</div>
        <div style={{ marginBottom: "0.5rem" }}>
          Vui lòng nhập mã bạn nhận được.
        </div>
        <Input
          placeholder="Nhập mã xác thực"
          maxLength="4"
          value={authenticateId}
          onChange={handleChangeAuthenticateId}
        />
      </Modal>
    </div>
  );
};

export default RegisterPage;
