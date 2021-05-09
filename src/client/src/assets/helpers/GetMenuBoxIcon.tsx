import { MODULE_TYPE } from "../../models/project";
import {
  VisualFilterIconClosed,
  VisualFilterIconOpen,
  UserIconOpen,
  UserIconClosed,
} from "../../assets/icons";

const GetMenuBoxIcon = (
  isOpen: boolean,
  key: string,
  handleClick: () => void
) => {
  const account = key === MODULE_TYPE.ACCOUNT;

  const icon = isOpen ? VisualFilterIconOpen : VisualFilterIconClosed;
  const iconAccount = isOpen ? UserIconOpen : UserIconClosed;

  return (
    <img
      src={account ? iconAccount : icon}
      alt="icon"
      className="icon"
      onClick={handleClick}
    />
  );
};

export default GetMenuBoxIcon;
