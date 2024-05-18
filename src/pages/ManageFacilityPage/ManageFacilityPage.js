import Search from "antd/es/input/Search";
import { Button, Input, Modal, Select, Table, Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/ManageFacilityPage/ManageFacilityPage.scss";
import { getInfoFac, modifyFacility } from "../../reducers/facilitySlice";
import {
  addSpecialist,
  deleteSpecialist,
  getListSpecialist,
} from "../../reducers/listSpecialistSlice";
import {
  addDoctor,
  deleteDoctor,
  getListDoctor,
  getListDoctorByID,
} from "../../reducers/listDoctorSlice";
import { allProvinces } from "../../utils";
import { useNavigate } from "react-router-dom";

const ManageFacilityPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const facility = useSelector((state) => state.facility);
  const listSpecialist = useSelector((state) => state.listSpecialist);
  const listDoctor = useSelector((state) => state.listDoctor);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    if (!token || roleId !== "4") {
      navigate("/");
    }

    dispatch(
      getInfoFac({
        facilityID: account.facilityID,
      })
    );
    dispatch(
      getListSpecialist({
        facilityID: account.facilityID,
      })
    );
    dispatch(
      getListDoctor({
        facilityID: account.facilityID,
      })
    );
  }, []);

  const columns = [
    {
      title: "Mã số",
      dataIndex: "doctorID",
      key: "1",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "Bằng cấp",
      dataIndex: "degree",
      key: "3",
      render: (degree) => (
        <span>
          {degree === "TS" ? "Tiến sĩ" : degree === "ThS" ? "Thạc sĩ" : ""}
        </span>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "4",
    },
    {
      title: "Chuyên khoa",
      dataIndex: "specialist",
      key: "5",
    },
    {
      title: "Giá khám",
      dataIndex: "price",
      key: "6",
      render: (price) => <span>{price}đ</span>,
    },
    {
      title: "Thao tác",
      key: "7",
      render: (doctor) => (
        <Button onClick={() => handleDeleteDoctor(doctor)}>Xóa</Button>
      ),
    },
  ];

  let lo = facility?.location.slice(
    0,
    facility?.location.lastIndexOf(", T") !== -1
      ? facility?.location.lastIndexOf(", T")
      : facility?.location.length
  );

  const [modifyFacilityModal, setModifyFacilityModal] = useState(false);
  const [addSpecialistModal, setAddSpecialistModal] = useState(false);
  const [deleteSpecialistModal, setDeleteSpecialistModal] = useState(false);
  const [addDoctorModal, setAddDoctorModal] = useState(false);
  const [deleteDoctorModal, setDeleteDoctorModal] = useState(false);

  const [modifyFacilityName, setModifyFacilityName] = useState(facility?.name);
  const [modifyLocationID, setModifyLocationID] = useState(
    facility?.locationID
  );
  const [modifyLocation, setModifyLocation] = useState(lo ? lo : "");

  const [addSpecialistName, setAddSpecialistName] = useState("");

  const [deleteSelectSpecialist, setDeleteSelectSpecialist] = useState(null);

  const [doctorSearch, setDoctorSearch] = useState("");

  const [addDoctorName, setAddDoctorName] = useState("");
  const [addDoctorDegree, setAddDoctorDegree] = useState(null);
  const [addDoctorGender, setAddDoctorGender] = useState(null);
  const [addDoctorSpecialist, setAddDoctorSpecialist] = useState(null);
  const [addDoctorPrice, setAddDoctorPrice] = useState("");

  const [deleteSelectDoctor, setDeleteSelectDoctor] = useState(null);

  const handleModifyFacility = () => {
    setModifyFacilityName(facility?.name);
    setModifyLocationID(facility?.locationID);
    setModifyLocation(lo ? lo : "");
    const errorMessage = document.getElementById(
      "error-message-modify-facility"
    );
    errorMessage?.classList.remove("error-message-modify-facility-block");
    setModifyFacilityModal(true);
  };

  const handleChangeFacilityname = (e) => {
    setModifyFacilityName(e.target.value);
  };

  const handleSelectLocationId = (value) => {
    setModifyLocationID(value);
  };

  const handleChangelocation = (e) => {
    setModifyLocation(e.target.value);
  };

  const handleOkModifyFacilityModal = async () => {
    if (
      modifyFacilityName === "" ||
      !modifyLocationID ||
      modifyLocation === ""
    ) {
      const errorMessage = document.getElementById(
        "error-message-modify-facility"
      );
      errorMessage?.classList.add("error-message-modify-facility-block");
    } else {
      let p = "";
      allProvinces.map((province) => {
        if (province.provinceId === modifyLocationID) {
          p = province.provinceName;
        }
      });
      await dispatch(
        modifyFacility({
          facilityID: facility?.facilityID,
          name: modifyFacilityName,
          locationID: modifyLocationID,
          location: p !== "" ? modifyLocation + ", " + p : modifyLocation,
        })
      );
      setModifyFacilityModal(false);
    }
  };

  const handleCancelModifyFacilityModal = () => {
    setModifyFacilityModal(false);
  };

  const handleAddSpecialist = () => {
    setAddSpecialistName("");
    const errorMessage = document.getElementById(
      "error-message-add-specialist"
    );
    errorMessage?.classList.remove("error-message-add-specialist-block");
    setAddSpecialistModal(true);
  };

  const handleChangeAddSpecialist = (e) => {
    setAddSpecialistName(e.target.value);
  };

  const handleOkAddSpecialistModal = async () => {
    let e = false;
    listSpecialist.map((specialist) => {
      if (specialist.toUpperCase() === addSpecialistName.toUpperCase()) {
        e = true;
      }
    });
    if (addSpecialistName === "" || e) {
      const errorMessage = document.getElementById(
        "error-message-add-specialist"
      );
      errorMessage?.classList.add("error-message-add-specialist-block");
    } else {
      await dispatch(
        addSpecialist({
          facilityID: facility?.facilityID,
          specialist: addSpecialistName,
        })
      );
      setAddSpecialistModal(false);
    }
  };

  const handleCancelAddSpecialistModal = () => {
    setAddSpecialistModal(false);
  };

  const handleDeleteSpecialist = (specialist) => {
    setDeleteSelectSpecialist(specialist);
    setDeleteSpecialistModal(true);
  };

  const handleOkDeleteSpecialistModal = async () => {
    await dispatch(
      deleteSpecialist({
        facilityID: facility?.facilityID,
        specialist: deleteSelectSpecialist,
      })
    );
    setDeleteSpecialistModal(false);
  };

  const handleCancelDeleteSpecialistModal = () => {
    setDeleteSpecialistModal(false);
  };

  const onDoctorsSearch = async (value) => {
    setDoctorSearch(value);
    await dispatch(
      getListDoctorByID({
        facilityID: facility?.facilityID,
        doctorID: value,
      })
    );
  };

  const handleAddDoctor = () => {
    setAddDoctorName("");
    setAddDoctorDegree(null);
    setAddDoctorGender(null);
    setAddDoctorSpecialist(null);
    setAddDoctorPrice("");
    const errorMessage = document.getElementById("error-message-add-doctor");
    errorMessage?.classList.remove("error-message-add-doctor-block");
    setAddDoctorModal(true);
  };

  const handleChangeAddDoctorName = (e) => {
    setAddDoctorName(e.target.value);
  };

  const handleSelectAddDoctorDegree = (value) => {
    setAddDoctorDegree(value);
  };

  const handleSelectAddDoctorGender = (value) => {
    setAddDoctorGender(value);
  };

  const handleSelectAddDoctorSpecialist = (value) => {
    setAddDoctorSpecialist(value);
  };

  const handleChangeAddDoctorPrice = (e) => {
    setAddDoctorPrice(e.target.value);
  };

  const handleOkAddDoctorModal = async () => {
    if (
      addDoctorName === "" ||
      !addDoctorDegree ||
      !addDoctorGender ||
      !addDoctorSpecialist ||
      addDoctorPrice === ""
    ) {
      const errorMessage = document.getElementById("error-message-add-doctor");
      errorMessage?.classList.add("error-message-add-doctor-block");
    } else {
      await dispatch(
        addDoctor({
          facilityID: facility?.facilityID,
          name: addDoctorName,
          degree: addDoctorDegree,
          gender: addDoctorGender,
          specialist: addDoctorSpecialist,
          price: addDoctorPrice,
        })
      );
      await dispatch(
        getListDoctorByID({
          facilityID: facility?.facilityID,
          doctorID: doctorSearch,
        })
      );
      setAddDoctorModal(false);
    }
  };

  const handleCancelAddDoctorModal = () => {
    setAddDoctorModal(false);
  };

  const handleDeleteDoctor = (doctor) => {
    setDeleteSelectDoctor(doctor);
    setDeleteDoctorModal(true);
  };

  const handleOkDeleteDoctorModal = async () => {
    await dispatch(deleteDoctor({
      doctorID: deleteSelectDoctor.doctorID,
    }));
    await dispatch(
      getListDoctorByID({
        facilityID: facility?.facilityID,
        doctorID: doctorSearch,
      })
    );
    setDeleteDoctorModal(false);
  };

  const handleCancelDeleteDoctorModal = () => {
    setDeleteDoctorModal(false);
  };

  return (
    <div className="manage-facility-container">
      <div className="manage-facility-box">
        <Card
          title="Thông tin cơ sở dịch vụ"
          extra={
            <Button type="primary" onClick={handleModifyFacility}>
              Chỉnh sửa
            </Button>
          }
          style={{ width: "49%" }}
        >
          <div>
            <span className="facility-title">Tên cơ sở:</span> {facility?.name}
          </div>
          <div>
            <span className="facility-title">Địa chỉ:</span>{" "}
            {facility?.location}
          </div>
          <div>
            <span className="facility-title">Dịch vụ:</span> {facility?.service}
          </div>
        </Card>

        <Card
          title={facility?.service === "Y tế" ? "Chuyên khoa" : "Lĩnh vực"}
          extra={
            <Button type="primary" onClick={handleAddSpecialist}>
              Thêm {facility?.service === "Y tế" ? "chuyên khoa" : "lĩnh vực"}
            </Button>
          }
          style={{ width: "49%" }}
        >
          <div className="specialist-list">
            {listSpecialist?.map((specialist, index) => (
              <div className="specialist-row" key={index}>
                <div className="specialist-name">
                  {specialist.toUpperCase()}
                </div>
                <Button onClick={() => handleDeleteSpecialist(specialist)}>
                  Xóa
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {facility?.service === "Y tế" ? (
        <div className="manage-facility-list-doctor">
          <div className="manage-facility-doctor-row">
            <div className="list-doctor-title">Danh sách các bác sĩ</div>
          </div>

          <div className="manage-facility-doctor-row">
            <Search
              placeholder="Tìm kiếm mã số"
              allowClear
              onSearch={onDoctorsSearch}
            />

            <Button
              className="add-doctor-button"
              type="primary"
              onClick={handleAddDoctor}
            >
              Thêm bác sĩ
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={listDoctor}
            rowKey={(doctor) => {
              return doctor?.doctorID;
            }}
            pagination={{
              pageSize: 3,
              position: ["bottomCenter"],
            }}
          />
        </div>
      ) : (
        ""
      )}

      <Modal
        className="modify-facility-modal"
        open={modifyFacilityModal}
        title="Chỉnh sửa thông tin cơ sở"
        onOk={handleOkModifyFacilityModal}
        onCancel={handleCancelModifyFacilityModal}
        footer={[
          <Button key="back" onClick={handleCancelModifyFacilityModal}>
            Quay lại
          </Button>,
          <Button
            key="modify"
            type="primary"
            onClick={handleOkModifyFacilityModal}
          >
            Chỉnh sửa
          </Button>,
        ]}
      >
        <div className="modify-modal-row">
          <div className="modify-modal-label">Tên cơ sở</div>
          <Input
            placeholder="Nhập tên cơ sở"
            value={modifyFacilityName}
            onChange={handleChangeFacilityname}
          />
        </div>

        <div className="modify-modal-row">
          <div className="modify-modal-label">Tỉnh/Thành phố</div>
          <Select
            placeholder="Chọn tỉnh/thành phố"
            allowClear
            value={modifyLocationID}
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

        <div className="modify-modal-row">
          <div className="modify-modal-label">
            Địa chỉ (số nhà, ngõ, đường, thôn, phường/xã, quận/huyện)
          </div>
          <Input
            placeholder="Nhập địa chỉ"
            value={modifyLocation}
            onChange={handleChangelocation}
          />
        </div>

        <div id="error-message-modify-facility">
          Vui lòng nhập đầy đủ thông tin
        </div>
      </Modal>

      <Modal
        className="modify-facility-modal"
        open={addSpecialistModal}
        title={
          facility?.service === "Y tế" ? "Thêm chuyên khoa" : "Thêm lĩnh vực"
        }
        onOk={handleOkAddSpecialistModal}
        onCancel={handleCancelAddSpecialistModal}
        footer={[
          <Button key="back" onClick={handleCancelAddSpecialistModal}>
            Quay lại
          </Button>,
          <Button key="add" type="primary" onClick={handleOkAddSpecialistModal}>
            {facility?.service === "Y tế"
              ? "Thêm chuyên khoa"
              : "Thêm lĩnh vực"}
          </Button>,
        ]}
      >
        <div className="modify-modal-row">
          <div className="modify-modal-label">Tên chuyên khoa</div>
          <Input
            placeholder="Nhập tên chuyên khoa"
            value={addSpecialistName}
            onChange={handleChangeAddSpecialist}
          />
        </div>

        <div id="error-message-add-specialist">
          Vui lòng kiểm tra lại thông tin
        </div>
      </Modal>

      <Modal
        title={
          facility?.service === "Y tế"
            ? "Xác nhận xóa chuyên khoa"
            : "Xác nhận xóa lĩnh vực"
        }
        open={deleteSpecialistModal}
        onOk={handleOkDeleteSpecialistModal}
        onCancel={handleCancelDeleteSpecialistModal}
        footer={[
          <Button key="back" onClick={handleCancelDeleteSpecialistModal}>
            Quay lại
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleOkDeleteSpecialistModal}
          >
            Xóa {facility?.service === "Y tế" ? "chuyên khoa" : "lĩnh vực"}
          </Button>,
        ]}
      >
        <p>
          Bạn có chắc chắn muốn xóa{" "}
          {facility?.service === "Y tế" ? "chuyên khoa" : "lĩnh vực"} này không?
        </p>
      </Modal>

      <Modal
        className="modify-facility-modal"
        open={addDoctorModal}
        title="Thêm bác sĩ"
        onOk={handleOkAddDoctorModal}
        onCancel={handleCancelAddDoctorModal}
        footer={[
          <Button key="back" onClick={handleCancelAddDoctorModal}>
            Quay lại
          </Button>,
          <Button key="add" type="primary" onClick={handleOkAddDoctorModal}>
            Thêm bác sĩ
          </Button>,
        ]}
      >
        <div className="modify-modal-row">
          <div className="modify-modal-label">Họ và tên</div>
          <Input
            placeholder="Nhập họ và tên"
            value={addDoctorName}
            onChange={handleChangeAddDoctorName}
          />
        </div>

        <div className="modify-modal-row">
          <div className="modify-modal-label">Bằng cấp</div>
          <Select
            placeholder="Chọn bằng cấp"
            allowClear
            value={addDoctorDegree}
            onChange={handleSelectAddDoctorDegree}
            options={[
              {
                value: "TS",
                label: "Tiến sĩ",
              },
              {
                value: "ThS",
                label: "Thạc sĩ",
              },
            ]}
          />
        </div>

        <div className="modify-modal-row">
          <div className="modify-modal-label">Giới tính</div>
          <Select
            placeholder="Chọn giới tính"
            allowClear
            value={addDoctorGender}
            onChange={handleSelectAddDoctorGender}
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
        </div>

        <div className="modify-modal-row">
          <div className="modify-modal-label">Chuyên khoa</div>
          <Select
            placeholder="Chọn chuyên khoa"
            allowClear
            value={addDoctorSpecialist}
            onChange={handleSelectAddDoctorSpecialist}
            options={listSpecialist?.map((spec) => ({
              value: spec,
              label: spec,
            }))}
          />
        </div>

        <div className="modify-modal-row">
          <div className="modify-modal-label">Giá khám</div>
          <Input
            placeholder="Nhập giá khám"
            value={addDoctorPrice}
            onChange={handleChangeAddDoctorPrice}
          />
        </div>

        <div id="error-message-add-doctor">Vui lòng nhập đầy đủ thông tin</div>
      </Modal>

      <Modal
        title="Xác nhận xóa bác sĩ"
        open={deleteDoctorModal}
        onOk={handleOkDeleteDoctorModal}
        onCancel={handleCancelDeleteDoctorModal}
        footer={[
          <Button key="back" onClick={handleCancelDeleteDoctorModal}>
            Quay lại
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleOkDeleteDoctorModal}
          >
            Xóa bác sĩ
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa bác sĩ này không?</p>
      </Modal>
    </div>
  );
};

export default ManageFacilityPage;
