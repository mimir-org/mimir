import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../menus/project/redux/actions";

const OnCreateClick = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.CREATE_PROJECT_MENU));
};

export default OnCreateClick;
