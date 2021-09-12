import { MENU_TYPE } from "../../../models/project";
import { changeMenu } from "../../../redux/store/projectMenu/actions";

const OnOpenClick = (dispatch: any) => {
  dispatch(changeMenu("mainMenu", false));
  dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, true));
  dispatch(changeMenu(MENU_TYPE.MAIN_MENU, false));
};

export default OnOpenClick;
