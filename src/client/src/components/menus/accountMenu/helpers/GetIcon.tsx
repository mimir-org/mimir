import {
  UserIconOpen,
  SaveIcon,
  LogoutIcon,
  CreateProjectIcon,
  OpenProjectIconSmall,
} from "../../../../assets/icons";

const GetIcon = (type: string) => {
  switch (type) {
    // case "UserIconOpen":
    //   return <img src={UserIconOpen} alt="user_open" className="user_icon" />;
    case "Save":
      return <img src={SaveIcon} alt="save-icon" />;
    case "Open":
      return <img src={OpenProjectIconSmall} alt="open-icon" />;
    case "Create":
      return <img src={CreateProjectIcon} alt="open-icon" />;
    // case "Logout":
    //   return <img src={LogoutIcon} alt="logout_icon" className="logout_icon" />;
    default:
      return null;
  }
};

export default GetIcon;
