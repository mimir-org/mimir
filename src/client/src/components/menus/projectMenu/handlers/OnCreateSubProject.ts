import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../subMenus/redux/menuSlice";

export const OnCreateSubProject = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.CREATE_SUB_PROJECT_MENU));
};
