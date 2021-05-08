import {
  UserIconClosed,
  UserIconOpen,
  SaveIcon,
  LogoutIcon,
  CreateProjectIcon,
  OpenProjectIconSmall,
} from "../../../../assets";
import "./getimg.scss";

interface Props {
  icon: String;
}

const GetIcon = ({ icon }: Props) => {
  switch (icon) {
    case "UserIconOpen":
      return <img src={UserIconOpen} alt="user_open" className="user_icon" />;
    case "SaveIcon":
      return <img src={SaveIcon} alt="save_icon" className="save_icon" />;
    case "OpenIcon":
      return (
        <img src={OpenProjectIconSmall} alt="open_icon" className="save_icon" />
      );
    case "CreateIcon":
      return (
        <img src={CreateProjectIcon} alt="open_icon" className="save_icon" />
      );
    case "LogoutIcon":
      return <img src={LogoutIcon} alt="logout_icon" className="logout_icon" />;
    default:
      return (
        <img src={UserIconClosed} alt="user_closed" className="user_icon" />
      );
  }
};

export default GetIcon;
