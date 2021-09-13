import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";

const OnOpenClick = (dispatch: any, setConfirm: any) => {
  setConfirm(true);
  dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, false));
};

export default OnOpenClick;
