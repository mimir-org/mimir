import { MENU_TYPE } from "../../models/project";
import {
  ClosedFilterIcon,
  OpenFilterIcon,
  OpenUserIcon,
  ClosedUserIcon,
} from "../icons/common";

const GetMenuBoxIcon = (isOpen: boolean, type: string) => {
  const isAccount = type === MENU_TYPE.ACCOUNT_MENU;
  const iconFilter = isOpen ? OpenFilterIcon : ClosedFilterIcon;
  const iconAccount = isOpen ? OpenUserIcon : ClosedUserIcon;

  return isAccount ? iconAccount : iconFilter;
};

export default GetMenuBoxIcon;
