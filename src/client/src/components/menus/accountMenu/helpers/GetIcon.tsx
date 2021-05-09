import {
  UserIconOpen,
  SaveIcon,
  LogoutIcon,
  CreateProjectIcon,
  OpenProjectIconSmall,
} from "../../../../assets/icons";
import "./getimg.scss";

const GetIcon = ({ icon }) => {
  switch (icon) {
    case "UserIconOpen":
      return <img src={UserIconOpen} alt="user_open" className="user_icon" />;
    case "Save":
      return <img src={SaveIcon} alt="save_icon" className="save_icon" />;
    case "Open":
      return (
        <img src={OpenProjectIconSmall} alt="open_icon" className="save_icon" />
      );
    case "Create":
      return (
        <img src={CreateProjectIcon} alt="open_icon" className="save_icon" />
      );
    case "Logout":
      return <img src={LogoutIcon} alt="logout_icon" className="logout_icon" />;
    default:
      return null;
  }
};

export default GetIcon;
