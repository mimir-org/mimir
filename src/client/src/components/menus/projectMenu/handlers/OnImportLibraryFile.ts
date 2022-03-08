import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnImportLibraryFile = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.IMPORT_LIBRARY_FILE_MENU));
};
