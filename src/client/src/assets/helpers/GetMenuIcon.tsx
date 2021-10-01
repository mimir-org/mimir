import { MENU_TYPE } from "../../models/project";
import { FilterOpenIcon, FilterClosedIcon, UserOpenIcon, UserClosedIcon } from "../icons/common";

const GetMenuBoxIcon = (isOpen: boolean, type: string) => {
  const isAccount = type === MENU_TYPE.ACCOUNT_MENU;
  const iconFilter = isOpen ? FilterOpenIcon : FilterClosedIcon;
  const iconAccount = isOpen ? UserOpenIcon : UserClosedIcon;

  return isAccount ? iconAccount : iconFilter;
};

export default GetMenuBoxIcon;
