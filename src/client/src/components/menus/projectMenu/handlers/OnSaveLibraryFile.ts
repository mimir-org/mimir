import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnSaveLibraryFile = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.SAVE_LIBRARY_FILE_MENU));
};
