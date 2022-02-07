import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../subMenus/redux/menuSlice";

const OnCreateClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.CREATE_PROJECT_MENU));
};

export default OnCreateClick;
