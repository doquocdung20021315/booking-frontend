import { Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../components/AppointmentPage/AppointmentPage.scss";

const AppointmentPage = () => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="appointment-container">
      {account ? (
        <p style={{ marginTop: "10rem"}}>Lịch hẹn</p>
      ) : (
        <Modal
          title="Bạn chưa đăng nhập"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Bạn cần đăng nhập để sử dụng tính năng này.</p>
        </Modal>
      )}
    </div>
  );
};

export default AppointmentPage;
