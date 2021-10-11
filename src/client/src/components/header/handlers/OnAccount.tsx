import { changeActiveMenu, setAccountMenuVisibility } from "../../menus/project/redux/actions";

const OnAccount = (dispatch: any, open: boolean) => {
  if (open) dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(!open));
};

export default OnAccount;
