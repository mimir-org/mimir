import { MENU_TYPE } from "../../../../../../models/project/project";
import { changeActiveMenu } from "../../redux/actions";

const OnOpenClick = (dispatch: any, setConfirm: any) => {
  setConfirm(true);
  dispatch(changeActiveMenu(MENU_TYPE.PROJECT_MENU));
};

export default OnOpenClick;
