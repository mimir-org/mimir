import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnSaveFile = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU));
};
