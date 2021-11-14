import { changeActiveMenu, setUserMenuVisibility } from "../../menus/projectMenu/subMenus/redux/actions";

const OnUser = (dispatch: any, open: boolean) => {
  if (open) dispatch(changeActiveMenu(null));
  dispatch(setUserMenuVisibility(!open));
};

export default OnUser;
