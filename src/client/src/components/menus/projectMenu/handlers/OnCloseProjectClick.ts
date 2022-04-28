import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnCloseProjectClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.CLOSE_PROJECT_MENU));
};
