import { Button, Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSpecialist } from "../../../reducers/listSpecialistSlice";
import "./Specialist.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";

const Specialist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const listSpecialist = useSelector((state) => state.listSpecialist);

  useEffect(() => {
    dispatch(
      getListSpecialist({
        facilityID: location.state.facility.facilityID,
      })
    );
  }, []);

  // console.log(listSpecialist)

  const handleClickSpecialist = (specialist) => {
    if (location.state.facility.service === "Y tế") {
      navigate("/booking/doctor", {
        state: {
          facility: location.state.facility,
          specialist: specialist,
        },
      });
    } else if (location.state.facility.service === "Hành chính") {
      navigate("/booking/datetime", {
        state: {
          facility: location.state.facility,
          specialist: specialist,
        },
      });
    }
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="specialist-container">
      <div>
        <Card
          title="Thông tin đặt lịch"
          headStyle={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
          style={{ marginTop: "10rem", width: "18rem" }}
        >
          <div className="booking-info-row">
            <div className="booking-info-icon">
              <i className="fa-solid fa-building"></i>
            </div>
            <span className="booking-info-content">
              Cơ sở: {location.state.facility.name}
            </span>
          </div>
        </Card>
      </div>

      <div className="specialist-main">
        <Card
          title={
            location.state.facility.service === "Y tế"
              ? "Vui lòng chọn chuyên khoa"
              : "Vui lòng chọn lĩnh vực"
          }
          headStyle={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
          style={{ width: "45rem" }}
        >
          {listSpecialist?.map((specialist, index) => (
            <div
              className="specialist"
              key={index}
              onClick={() => handleClickSpecialist(specialist)}
            >
              {index === 0 ? "" : <div className="specialist-hr" />}
              {specialist.toUpperCase()}
            </div>
          ))}
        </Card>
        <div className="specialist-button-box">
          <Button
            className="specialist-button"
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

export default Specialist;
