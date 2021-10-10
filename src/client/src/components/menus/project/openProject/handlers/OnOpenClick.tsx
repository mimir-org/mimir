import { changeActiveMenu } from "../../../project/redux/actions";

const OnOpenClick = (dispatch: any, setConfirm: any) => {
  setConfirm(true);
  dispatch(changeActiveMenu(null));
};

export default OnOpenClick;
