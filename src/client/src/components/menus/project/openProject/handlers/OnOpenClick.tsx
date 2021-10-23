import { MENU_TYPE } from "../../../../../models/project/project";
import { changeActiveMenu } from "../../../project/redux/actions";

const OnOpenClick = (dispatch: any, setConfirm: any) => {
  setConfirm(true);
  dispatch(changeActiveMenu(MENU_TYPE.ACCOUNT_MENU));
};

export default OnOpenClick;
