import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../lib/models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnCreateClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.CREATE_PROJECT_MENU));
};
