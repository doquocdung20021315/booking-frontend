import { Button, DatePicker, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../components/RegisterPage/RegisterPage.scss";
import { register } from "../../reducers/accountSlice";

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    if (values.password === values.passwordConfirm) {
      const { payload } = await dispatch(register({
        username: values.username,
        password: values.password,
        fullname: values.fullname,
        birthday: values.birthday.format('DD-MM-YYYY'),
        gender: values.gender,
        phone: values.phone,
      }))

      if (payload.message === "Người dùng đã tồn tại") {
        const errorMessage = document.getElementById('error-message')
        const eMessage = document.createElement('div')
        eMessage.classList.add('error-message')
        eMessage.innerHTML = `
        <div class='error-icon'>x</div>
        <div>Tên tài khoản đã tồn tại</div>
        `
        errorMessage?.appendChild(eMessage)
        setTimeout(() => {
          errorMessage?.removeChild(eMessage)
        }, 3000)
      }

      if (payload.message === "Đăng ký thành công") {
        navigate("/login")
      }
    } else {
      const errorMessage = document.getElementById('error-message')
      const eMessage = document.createElement('div')
      eMessage.classList.add('error-message')
      eMessage.innerHTML = `
      <div class='error-icon'>x</div>
      <div>Xin quý khách xác nhận lại mật khẩu</div>
      `
      errorMessage?.appendChild(eMessage)
      setTimeout(() => {
        errorMessage?.removeChild(eMessage)
      }, 3000)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Lỗi:', errorInfo);
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
          <span> (<span className="star">*</span>) </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="username"
          rules={[{ required: true, message: 'Hãy nhập tên tài khoản của bạn!' }]}
        >
          <Input className="register-input" placeholder="Nhập tên tài khoản" />
        </Form.Item>

        <div className="register-label">
          <span>Mật khẩu</span>
          <span> (<span className="star">*</span>) </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="password"
          rules={[{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }]}
        >
          <Input.Password className="register-input" placeholder="Nhập mật khẩu" />
        </Form.Item>

        <div className="register-label">
          <span>Xác nhận mật khẩu</span>
          <span> (<span className="star">*</span>) </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="passwordConfirm"
          rules={[{ required: true, message: 'Hãy xác nhận mật khẩu của bạn!' }]}
        >
          <Input.Password className="register-input" placeholder="Xác nhận mật khẩu" />
        </Form.Item>

        <div className="register-label">
          <span>Họ và tên</span>
          <span> (<span className="star">*</span>) </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="fullname"
          rules={[{ required: true, message: 'Hãy nhập họ và tên của bạn!' }]}
        >
          <Input className="register-input" placeholder="Nhập họ và tên" />
        </Form.Item>

        <div className="register-birthday-gender">
          <div className="register-birthday">
            <div className="register-label">
              <span>Ngày sinh</span>
              <span> (<span className="star">*</span>) </span>
            </div>
            <Form.Item
              className="register-form-item"
              name="birthday"
              rules={[{ required: true, message: 'Hãy nhập ngày sinh của bạn!' }]}
            >
              <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày sinh"/>
            </Form.Item>
          </div>

          <div className="register-gender">
            <div className="register-label">
              <span>Giới tính</span>
              <span> (<span className="star">*</span>) </span>
            </div>
            <Form.Item
              className="register-form-item"
              name="gender"
              rules={[{ required: true, message: 'Hãy nhập giới tính của bạn!' }]}
            >
              <Select
                placeholder="Chọn giới tính"
                options={[
                  {
                    value: 'M',
                    label: 'Nam',
                  },
                  {
                    value: 'FM',
                    label: 'Nữ',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <div className="register-label">
          <span>Số điện thoại</span>
          <span> (<span className="star">*</span>) </span>
        </div>
        <Form.Item
          className="register-form-item"
          name="phone"
          rules={[{ required: true, message: 'Hãy nhập số điện thoại của bạn!' }]}
        >
          <Input className="register-input" placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item className="register-form-item" wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="register-button" type="primary" htmlType="submit">
            ĐĂNG KÝ
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage