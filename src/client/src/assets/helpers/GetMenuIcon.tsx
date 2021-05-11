import { MENU_TYPE } from "../../models/project";
import {
  ClosedFilterIcon,
  OpenFilterIcon,
  OpenUserIcon,
  ClosedUserIcon,
} from "../icons";

const GetMenuBoxIcon = (isOpen: boolean, type: string) => {
  const account = type === MENU_TYPE.ACCOUNT;
  const iconFilter = isOpen ? OpenFilterIcon : ClosedFilterIcon;
  const iconAccount = isOpen ? OpenUserIcon : ClosedUserIcon;

  return account ? iconAccount : iconFilter;
};

export default GetMenuBoxIcon;
