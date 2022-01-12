import { changeActiveMenu, setUserMenuVisibility } from "../../menus/projectMenu/subMenus/redux/menuSlice";

const OnUser = (dispatch: any, open: boolean) => {
  if (open) dispatch(changeActiveMenu(null));
  dispatch(setUserMenuVisibility(!open));
};

export default OnUser;
