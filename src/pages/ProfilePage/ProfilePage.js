import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../reducers/accountSlice";
import "../../components/ProfilePage/ProfilePage.scss";

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickLogout = () => {
    localStorage.removeItem("token")
    dispatch(setLogin(null))
    navigate("/")
  }

  return (
    <div className="profile-container">
      <p style={{ marginTop: "10rem"}}>Profile Page</p>
      <Button onClick={handleClickLogout}>Đăng xuất</Button>
    </div>
  )
}

export default ProfilePage