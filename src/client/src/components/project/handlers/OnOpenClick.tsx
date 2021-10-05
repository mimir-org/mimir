import { MENU_TYPE } from "../../../models/project";
import { changeActiveMenu } from "../../../redux/store/projectMenu/actions";

const OnOpenClick = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
};

export default OnOpenClick;
