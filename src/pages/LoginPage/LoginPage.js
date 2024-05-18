import { LockFilled, MailFilled, PhoneFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getInfoAccount, login } from "../../reducers/accountSlice";
import "../../components/LoginPage/LoginPage.scss";
import { useEffect } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const onFinish = async (values) => {
    const { payload } = await dispatch(
      login({
        username: values.username,
        password: values.password,
      })
    );
    if (payload) {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("roleId", payload.roleId);
      if (payload.facilityID) {
        localStorage.setItem("facilityID", payload.facilityID);
      }
      dispatch(
        getInfoAccount({
          token: payload.token,
        })
      );
      navigate("/");
    } else {
      const errorMessage = document.getElementById("error-message");
      const eMessage = document.createElement("div");
      eMessage.classList.add("error-message");
      eMessage.innerHTML = `
      <div class='error-icon'>x</div>
      <div>Thông tin đăng nhập không chính xác</div>
      `;
      errorMessage?.appendChild(eMessage);
      setTimeout(() => {
        errorMessage?.removeChild(eMessage);
      }, 3000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Lỗi:", errorInfo);
  };

  return (
    <div className="login-page">
      <div id="error-message" />
      <Form
        className="login-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="login-name">ỨNG DỤNG ĐẶT LỊCH</div>

        <Form.Item
          className="login-form-item"
          name="username"
          rules={[
            { required: true, message: "Hãy nhập tên tài khoản của bạn!" },
          ]}
        >
          <Input
            className="login-input"
            prefix={<MailFilled />}
            placeholder="Nhập tên tài khoản"
          />
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="password"
          rules={[{ required: true, message: "Hãy nhập mật khẩu của bạn!" }]}
        >
          <Input.Password
            className="login-input"
            prefix={<LockFilled />}
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>

        <Form.Item
          className="login-form-item"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button className="login-button" type="primary" htmlType="submit">
            ĐĂNG NHẬP
          </Button>
        </Form.Item>

        <div className="register">
          <span className="register-text">Bạn chưa có tài khoản? </span>
          <Link className="register-link" to="/register">
            Đăng ký ngay!
          </Link>
        </div>

        <div className="login-contact">
          <span className="login-support">
            <PhoneFilled className="contact-icon" />
            <span className="contact-text">Hỗ trợ:</span>
          </span>
          <span className="login-phone">012 345 6789 - Đỗ Quốc Dũng</span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
