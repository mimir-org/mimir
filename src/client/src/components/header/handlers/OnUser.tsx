import { changeActiveMenu, setUserMenuVisibility } from "../../menus/project/redux/actions";

const OnUser = (dispatch: any, open: boolean) => {
  if (open) dispatch(changeActiveMenu(null));
  dispatch(setUserMenuVisibility(!open));
};

export default OnUser;
