import { Button, Input, Modal, Select, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/AdminAccountPage/AdminAccountPage.scss";
import { setCriteriaSearchAccount } from "../../reducers/criteriaSearchAccountSlice";
import {
  createAccount,
  deleteAccount,
  getAllAccountByNotRole,
  searchAccount,
  setListAccount,
} from "../../reducers/listAccountSlice";
import { useNavigate } from "react-router-dom";

const AdminAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listAccount = useSelector((state) => state.listAccount);
  const criteriaSearchAccount = useSelector(
    (state) => state.criteriaSearchAccount
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    if (!token || roleId !== "3") {
      navigate("/");
    }

    dispatch(
      getAllAccountByNotRole({
        roleId: "3",
      })
    );
    dispatch(
      setCriteriaSearchAccount({
        ...criteriaSearchAccount,
        accountId: "",
        roleId: "",
        facilityID: null,
      })
    );
  }, []);

  const columns = [
    {
      title: "Mã tài khoản",
      dataIndex: "_id",
      key: "1",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "2",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "3",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "4",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "5",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "6",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "7",
    },
    {
      title: "Vai trò",
      dataIndex: "roleId",
      key: "8",
      render: (roleId) => (
        <span>
          {roleId === "1"
            ? "Khách hàng"
            : roleId === "2"
            ? "Lễ tân"
            : roleId === "4"
            ? "Quản lý cơ sở"
            : ""}
        </span>
      ),
    },
    {
      title: "Mã cơ sở",
      dataIndex: "facilityID",
      key: "9",
      render: (facilityID) => <span>{facilityID ? facilityID : ""}</span>,
    },
    {
      title: "Thao tác",
      key: "10",
      render: (account) => (
        <Button onClick={() => handleClickDelete(account)}>
          Xóa tài khoản
        </Button>
      ),
    },
  ];

  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [createUsername, setCreateUsername] = useState("");
  const [createFullname, setCreateFullname] = useState("");
  const [createFacilityID, setCreateFacilityID] = useState("");
  const [createRoleId, setCreateRoleId] = useState(null);
  const [deleteSelectAccount, setDeleteSelectAccount] = useState(null);

  const [eM, setEM] = useState("Vui lòng nhập đầy đủ thông tin");

  const onAccountsSearch = async (value) => {
    const { payload } = await dispatch(
      searchAccount({
        ...criteriaSearchAccount,
        accountId: value,
      })
    );
    dispatch(
      setCriteriaSearchAccount({
        ...criteriaSearchAccount,
        accountId: value,
      })
    );
    dispatch(setListAccount(payload));
  };

  const handleSelectRole = async (value) => {
    if (value !== undefined) {
      const { payload } = await dispatch(
        searchAccount({
          ...criteriaSearchAccount,
          roleId: value,
        })
      );
      dispatch(
        setCriteriaSearchAccount({
          ...criteriaSearchAccount,
          roleId: value,
        })
      );
      dispatch(setListAccount(payload));
    } else {
      const { payload } = await dispatch(
        searchAccount({
          ...criteriaSearchAccount,
          roleId: "",
        })
      );
      dispatch(
        setCriteriaSearchAccount({
          ...criteriaSearchAccount,
          roleId: "",
        })
      );
      dispatch(setListAccount(payload));
    }
  };

  const handleClickCreate = () => {
    setCreateUsername("");
    setCreateFullname("");
    setCreateFacilityID("");
    setCreateRoleId(null);
    const errorMessage = document.getElementById(
      "error-message-create-account"
    );
    errorMessage?.classList.remove("error-message-create-account-block");
    setCreateModal(true);
  };

  const handleChangeUsername = (e) => {
    setCreateUsername(e.target.value);
  };

  const handleChangeFullname = (e) => {
    setCreateFullname(e.target.value);
  };

  const handleChangeFacilityID = (e) => {
    setCreateFacilityID(e.target.value);
  };

  const handleSelectRoleId = (value) => {
    setCreateRoleId(value);
  };

  const handleOkCreateModal = async () => {
    if (
      createUsername === "" ||
      createFullname === "" ||
      createFacilityID === "" ||
      !createRoleId
    ) {
      setEM("Vui lòng nhập đầy đủ thông tin");
      const errorMessage = document.getElementById(
        "error-message-create-account"
      );
      errorMessage?.classList.add("error-message-create-account-block");
    } else {
      const { payload } = await dispatch(
        createAccount({
          username: createUsername,
          fullname: createFullname,
          facilityID: createFacilityID,
          roleId: createRoleId,
        })
      );

      if (payload.message === "Người dùng đã tồn tại") {
        setEM("Người dùng đã tồn tại");
        const errorMessage = document.getElementById(
          "error-message-create-account"
        );
        errorMessage?.classList.add("error-message-create-account-block");
      } else if (payload.message === "Cơ sở không tồn tại") {
        setEM("Cơ sở không tồn tại");
        const errorMessage = document.getElementById(
          "error-message-create-account"
        );
        errorMessage?.classList.add("error-message-create-account-block");
      } else if (payload.message === "Tạo tài khoản thành công") {
        const { payload } = await dispatch(
          searchAccount({
            ...criteriaSearchAccount,
          })
        );
        dispatch(setListAccount(payload));
        setCreateModal(false);
      }
    }
  };

  const handleCancelCreateModal = () => {
    setCreateModal(false);
  };

  const handleClickDelete = (account) => {
    setDeleteSelectAccount(account);
    setDeleteModal(true);
  };

  const handleOkDeleteModal = async () => {
    await dispatch(
      deleteAccount({
        accountId: deleteSelectAccount._id,
      })
    );
    const { payload } = await dispatch(
      searchAccount({
        ...criteriaSearchAccount,
      })
    );
    dispatch(setListAccount(payload));
    setDeleteModal(false);
  };

  const handleCancelDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <div className="admin-account-container">
      <div className="admin-account-box">
        <div className="admin-account-search">
          <Search
            placeholder="Tìm kiếm mã tài khoản"
            allowClear
            onSearch={onAccountsSearch}
          />

          <div className="admin-account-role-add-button">
            <Select
              className="admin-account-role"
              placeholder="Chọn vai trò"
              allowClear
              onChange={handleSelectRole}
              options={[
                {
                  value: "1",
                  label: "Khách hàng",
                },
                {
                  value: "2",
                  label: "Lễ tân",
                },
                {
                  value: "4",
                  label: "Quản lý cơ sở",
                },
              ]}
            />

            <Button type="primary" onClick={handleClickCreate}>
              Tạo tài khoản
            </Button>
          </div>
        </div>

        <div className="list-account">
          <Table
            className="admin-account-table"
            columns={columns}
            dataSource={listAccount}
            rowKey={(account) => {
              return account._id;
            }}
            pagination={{
              pageSize: 7,
              position: ["bottomCenter"],
            }}
          />
        </div>
      </div>

      <Modal
        className="admin-account-create-modal"
        open={createModal}
        title="Tạo tài khoản"
        onOk={handleOkCreateModal}
        onCancel={handleCancelCreateModal}
        footer={[
          <Button key="back" onClick={handleCancelCreateModal}>
            Quay lại
          </Button>,
          <Button key="create" type="primary" onClick={handleOkCreateModal}>
            Tạo tài khoản
          </Button>,
        ]}
      >
        <div className="create-modal-row">
          <div className="create-modal-label">Tên tài khoản</div>
          <Input
            placeholder="Nhập tên tài khoản"
            value={createUsername}
            onChange={handleChangeUsername}
          />
        </div>

        <div className="create-modal-row">
          <div className="create-modal-label">Họ và tên</div>
          <Input
            placeholder="Nhập họ và tên"
            value={createFullname}
            onChange={handleChangeFullname}
          />
        </div>

        <div className="create-modal-facid-role">
          <div className="create-modal-row create-modal-facid">
            <div className="create-modal-label">Mã cơ sở</div>
            <Input
              placeholder="Nhập mã cơ sở"
              value={createFacilityID}
              onChange={handleChangeFacilityID}
            />
          </div>

          <div className="create-modal-row create-modal-role">
            <div className="create-modal-label">Chức vụ</div>
            <Select
              placeholder="Chọn vai trò"
              allowClear
              value={createRoleId}
              onChange={handleSelectRoleId}
              options={[
                {
                  value: "4",
                  label: "Quản lý cơ sở",
                },
                {
                  value: "2",
                  label: "Lễ tân",
                },
              ]}
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>

        <div id="error-message-create-account">{eM}</div>
      </Modal>

      <Modal
        title="Xác nhận xóa tài khoản"
        open={deleteModal}
        onOk={handleOkDeleteModal}
        onCancel={handleCancelDeleteModal}
        footer={[
          <Button key="back" onClick={handleCancelDeleteModal}>
            Quay lại
          </Button>,
          <Button key="delete" type="primary" onClick={handleOkDeleteModal}>
            Xóa tài khoản
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
      </Modal>
    </div>
  );
};

export default AdminAccountPage;
