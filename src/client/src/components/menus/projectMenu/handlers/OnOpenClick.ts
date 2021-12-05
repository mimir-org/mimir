import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../menus/projectMenu/subMenus/redux/actions";

const OnOpenClick = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
};

export default OnOpenClick;