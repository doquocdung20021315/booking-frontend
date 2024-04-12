import { Button, Input, Modal, Select, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/AdminFacilityPage/AdminFacilityPage.scss";
import { setCriteriaSearchFacility } from "../../reducers/criteriaSearchFacilitySlice";
import {
  addFacility,
  deleteFacility,
  getAllFacility,
  searchFacility,
} from "../../reducers/listFacilitySlice";
import { allProvinces } from "../../utils";

const AdminFacilityPage = () => {
  const dispatch = useDispatch();
  const listFacility = useSelector((state) => state.listFacility);
  const criteriaSearchFacility = useSelector(
    (state) => state.criteriaSearchFacility
  );

  useEffect(() => {
    dispatch(getAllFacility());
  }, []);

  const columns = [
    {
      title: "Mã số",
      dataIndex: "facilityID",
      key: "1",
    },
    {
      title: "Tên cơ sở",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "3",
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "4",
    },
    {
      title: "Thao tác",
      key: "5",
      render: (facility) => (
        <Button onClick={() => handleClickDelete(facility)}>Xóa cơ sở</Button>
      ),
    },
  ];

  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [addFacilityName, setAddFacilityName] = useState("");
  const [addService, setAddService] = useState(null);
  const [addLocationID, setAddLocationID] = useState(null);
  const [addLocation, setAddLocation] = useState("");

  const [deleteSelectFacility, setDeleteSelectFacility] = useState(null);

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

  const handleClickAdd = () => {
    setAddFacilityName("");
    setAddService(null);
    setAddLocationID(null);
    setAddLocation("");
    const errorMessage = document.getElementById("error-message-add-facility");
    errorMessage?.classList.remove("error-message-add-facility-block");
    setAddModal(true);
  };

  const handleChangeFacilityname = (e) => {
    setAddFacilityName(e.target.value);
  };

  const handleSelectService = (value) => {
    setAddService(value);
  };

  const handleSelectLocationId = (value) => {
    setAddLocationID(value);
  };

  const handleChangelocation = (e) => {
    setAddLocation(e.target.value);
  };

  const handleOkaddModal = async () => {
    // console.log(addFacilityName, addService, addLocationID, addLocation);
    if (
      addFacilityName === "" ||
      !addService ||
      !addLocationID ||
      addLocation === ""
    ) {
      const errorMessage = document.getElementById("error-message-add-facility");
      errorMessage?.classList.add("error-message-add-facility-block");
    } else {
      let lo = "";
      allProvinces?.map((province) => {
        if (province.provinceId === addLocationID) {
          lo = addLocation + ", " + province.provinceName
        }
      });
      await dispatch(addFacility({
        name: addFacilityName,
        location: lo,
        locationID: addLocationID,
        service: addService,
      }));
      await dispatch(
        searchFacility({
          ...criteriaSearchFacility,
        })
      );
      setAddModal(false);
    }
  };

  const handleCanceladdModal = () => {
    setAddModal(false);
  };

  const handleClickDelete = (facility) => {
    setDeleteSelectFacility(facility);
    setDeleteModal(true);
  };

  const handleOkDeleteModal = async () => {
    await dispatch(deleteFacility({
      facilityID: deleteSelectFacility.facilityID,
    }));
    await dispatch(
      searchFacility({
        ...criteriaSearchFacility,
      })
    );
    setDeleteModal(false);
  };

  const handleCancelDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <div className="admin-facility-container">
      <div className="admin-facility-box">
        <div className="admin-facility-search">
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
            style={{
              minWidth: "190px",
              height: "2.5rem",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />

          <Button type="primary" onClick={handleClickAdd}>
            Thêm cơ sở
          </Button>
        </div>

        <div>
          <Table
            columns={columns}
            dataSource={listFacility}
            rowKey={(facility) => {
              return facility._id;
            }}
            pagination={{
              pageSize: 7,
              position: ["bottomCenter"],
            }}
          />
        </div>
      </div>

      <Modal
        className="admin-facility-add-modal"
        open={addModal}
        title="Thêm cơ sở"
        onOk={handleOkaddModal}
        onCancel={handleCanceladdModal}
        footer={[
          <Button key="back" onClick={handleCanceladdModal}>
            Quay lại
          </Button>,
          <Button key="add" type="primary" onClick={handleOkaddModal}>
            Thêm cơ cở
          </Button>,
        ]}
      >
        <div className="add-modal-row">
          <div className="add-modal-label">Tên cơ sở</div>
          <Input
            placeholder="Nhập tên cơ sở"
            value={addFacilityName}
            onChange={handleChangeFacilityname}
          />
        </div>

        <div className="add-modal-row add-modal-service-province">
          <div>
            <div className="add-modal-label">Dịch vụ</div>
            <Select
              placeholder="Chọn dịch vụ"
              allowClear
              value={addService}
              options={[
                {
                  value: "Y tế",
                  label: "Y tế",
                },
                {
                  value: "Hành chính",
                  label: "Hành chính",
                },
              ]}
              onChange={handleSelectService}
              style={{
                minWidth: "140px",
              }}
            />
          </div>

          <div>
            <div className="add-modal-label">Tỉnh/Thành phố</div>
            <Select
              placeholder="Chọn tỉnh/thành phố"
              allowClear
              value={addLocationID}
              onChange={handleSelectLocationId}
              options={allProvinces?.map((province) => ({
                value: province.provinceId,
                label: province.provinceName,
              }))}
              style={{
                minWidth: "190px",
              }}
            />
          </div>
        </div>

        <div className="add-modal-row">
          <div className="add-modal-label">
            Địa chỉ (số nhà, ngõ, đường, thôn, phường/xã, quận/huyện)
          </div>
          <Input
            placeholder="Nhập địa chỉ"
            value={addLocation}
            onChange={handleChangelocation}
          />
        </div>

        <div id="error-message-add-facility">
          Vui lòng nhập đầy đủ thông tin
        </div>
      </Modal>

      <Modal
        title="Xác nhận xóa cơ sở"
        open={deleteModal}
        onOk={handleOkDeleteModal}
        onCancel={handleCancelDeleteModal}
        footer={[
          <Button key="back" onClick={handleCancelDeleteModal}>
            Quay lại
          </Button>,
          <Button key="confirm" type="primary" onClick={handleOkDeleteModal}>
            Xóa cơ sở
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa cơ sở này không?</p>
      </Modal>
    </div>
  );
};

export default AdminFacilityPage;
