import { MENU_TYPE } from "../../models/project";
import {
  FilterIconClosed,
  FilterIconOpen,
  UserIconOpen,
  UserIconClosed,
} from "../../assets/icons";

const GetMenuBoxIcon = (isOpen: boolean, type: string) => {
  const account = type === MENU_TYPE.ACCOUNT;
  const iconFilter = isOpen ? FilterIconOpen : FilterIconClosed;
  const iconAccount = isOpen ? UserIconOpen : UserIconClosed;

  return account ? iconAccount : iconFilter;
};

export default GetMenuBoxIcon;
