import { changeActiveMenu } from "../../../../redux/store/projectMenu/actions";

const OnOpenClick = (dispatch: any, setConfirm: any) => {
  setConfirm(true);
  dispatch(changeActiveMenu(null));
};

export default OnOpenClick;
