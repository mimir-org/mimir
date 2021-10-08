import { changeActiveMenu, setAccountMenuVisibility } from "../../../redux/store/projectMenu/actions";

const OnAccount = (dispatch: any, open: boolean) => {
  if (open) dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(!open));
};

export default OnAccount;
