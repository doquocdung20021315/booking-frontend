import { Button, Input, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/ManageAccountPage/ManageAccountPage.scss";
import { setCriteriaSearchAccount } from "../../reducers/criteriaSearchAccountSlice";
import {
  createAccount,
  deleteAccount,
  getAllAccountByFacilityAndRole,
  searchAccount,
  setListAccount
} from "../../reducers/listAccountSlice";
import { useNavigate } from "react-router-dom";

const ManageAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const listAccount = useSelector((state) => state.listAccount);
  const criteriaSearchAccount = useSelector(
    (state) => state.criteriaSearchAccount
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    if (!token || roleId !== "4") {
      navigate("/");
    }

    dispatch(
      getAllAccountByFacilityAndRole({
        facilityID: account?.facilityID,
        roleId: "2",
      })
    );
    dispatch(
      setCriteriaSearchAccount({
        ...criteriaSearchAccount,
        facilityID: account?.facilityID,
        roleId: "2",
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

  const handleClickCreate = () => {
    setCreateUsername("");
    setCreateFullname("");
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

  const handleOkCreateModal = async () => {
    if (
      createUsername === "" ||
      createFullname === ""
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
          facilityID: account?.facilityID,
          roleId: "2",
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
    <div className="manage-account-container">
      <div className="manage-account-box">
        <div className="manage-account-search">
          <Search
            placeholder="Tìm kiếm mã tài khoản"
            allowClear
            onSearch={onAccountsSearch}
          />

          <Button className="manage-account-add-button" type="primary" onClick={handleClickCreate}>
            Tạo tài khoản
          </Button>
        </div>

        <div className="list-account">
          <Table
            className="manage-account-table"
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
        className="manage-account-create-modal"
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

export default ManageAccountPage;
