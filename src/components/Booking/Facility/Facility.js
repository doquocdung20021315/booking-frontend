import { Avatar, Button, Card, Modal, Select } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCriteriaSearchFacility } from "../../../reducers/criteriaSearchFacilitySlice";
import {
  getAllFacility,
  searchFacility,
} from "../../../reducers/listFacilitySlice";
import { allProvinces } from "../../../utils";
import "./Facility.scss";
import Meta from "antd/es/card/Meta";

const Facility = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const listFacility = useSelector((state) => state.listFacility);
  const criteriaSearchFacility = useSelector(
    (state) => state.criteriaSearchFacility
  );

  useEffect(() => {
    dispatch(getAllFacility());
  }, []);

  // console.log(listFacility);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFacilitiesSearch = (value) => {
    dispatch(
      searchFacility({
        ...criteriaSearchFacility,
        name: value,
      })
    );
    dispatch(
      setCriteriaSearchFacility({
        ...criteriaSearchFacility,
        name: value,
      })
    );
  };

  const handleSelectProvince = (value) => {
    if (value !== undefined) {
      dispatch(
        searchFacility({
          ...criteriaSearchFacility,
          locationID: value,
        })
      );
      dispatch(
        setCriteriaSearchFacility({
          ...criteriaSearchFacility,
          locationID: value,
        })
      );
    } else {
      dispatch(
        searchFacility({
          ...criteriaSearchFacility,
          locationID: "",
        })
      );
      dispatch(
        setCriteriaSearchFacility({
          ...criteriaSearchFacility,
          locationID: "",
        })
      );
    }
  };

  const handleClickFacility = (facility) => {
    if (account.fullname !== "") {
      navigate("/booking/specialist", {
        state: { facility: facility },
      });
    } else {
      showModal();
    }
  };

  return (
    <div className="facility-container">
      <div className="facility-search">
        <Search
          placeholder="Tìm kiếm cơ sở"
          allowClear
          onSearch={onFacilitiesSearch}
        />
        <Select
          placeholder="Chọn tỉnh/thành phố"
          allowClear
          onChange={handleSelectProvince}
          options={allProvinces?.map((province) => ({
            value: province.provinceId,
            label: province.provinceName,
          }))}
          style={{ minWidth: "190px", height: "2.5rem", marginLeft: "1rem" }}
        />
      </div>
      <div className="facility-list">
        {listFacility?.map((facility, index) => (
          <Card
            key={index}
            size="small"
            // title={facility.name}
            style={{
              width: "47%",
              // height: "10rem",
              border: "1px solid grey",
              margin: "1.5rem 0",
              cursor: "pointer",
            }}
            // onClick={() => handleClickFacility(facility)}
          >
            {/* <p>{facility.location}</p> */}
            <Meta
              className="facility-content"
              avatar={
                <Avatar
                  src={
                    facility.service === "Y tế"
                      ? "https://dtnh.hcmulaw.edu.vn/upload/images/LOGO/health-heart-free-vector-icon-800x566.jpg"
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4_3kqoCf3mzByz9BAD-iljhvMCU4W8EbQdQ&usqp=CAU"
                  }
                />
              }
              title={facility.name}
              description={facility.location}
            />
            <div className="facility-button-box">
              <Button
                type="primary"
                onClick={() => handleClickFacility(facility)}
              >
                Đặt lịch ngay
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal
        title="Bạn chưa đăng nhập"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại
          </Button>,
          <Button key="login" type="primary" onClick={handleOk}>
            Đăng nhập
          </Button>,
        ]}
      >
        <p>Bạn cần đăng nhập để sử dụng tính năng này.</p>
      </Modal>
    </div>
  );
};

export default Facility;
