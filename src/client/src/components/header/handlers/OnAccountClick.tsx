import { setAccountMenuVisibility } from "../../../redux/store/projectMenu/actions";

const OnAccountClick = (dispatch: any, open: boolean) => {
  dispatch(setAccountMenuVisibility(!open));
};

export default OnAccountClick;
