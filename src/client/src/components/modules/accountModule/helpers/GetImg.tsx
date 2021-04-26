import {
  UserIconClosed,
  UserIconOpen,
  SaveIcon,
  LogoutIcon,
} from "../../../../assets";
import "./getimg.scss";

interface GetImgProps {
  icon: String;
}

const GetImg = ({ icon }: GetImgProps) => {
  switch (icon) {
    case "UserIconOpen":
      return (
        <img src={UserIconOpen} alt="user_open" className="user_icon" />
      );
    case "SaveIcon":
      return <img src={SaveIcon} alt="save_icon" className="save_icon" />;
    case "LogoutIcon":
      return <img src={LogoutIcon} alt="logout_icon" className="logout_icon" />;
    default:
      return (
        <img
          src={UserIconClosed}
          alt="user_closed"
          className="user_icon"
        />
      );
  }
};

export default GetImg;
