import { Button } from "antd";
import "../../components/HomePage/HomePage.scss";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()

  const handleClickBooking = () => {
    navigate("/booking/facility")
  }

  return (
    <div className="home-container">
      <h2>Nền tảng công nghệ</h2>
      <h1>Kết nối người dân với Cơ sở - Dịch vụ nhanh chóng</h1>
      <h3>Đặt lịch dễ dàng - Lấy số thứ tự trực tuyến</h3>
      <Button type="primary" onClick={handleClickBooking}>Đặt lịch ngay</Button>
    </div>
  )
}

export default HomePage;