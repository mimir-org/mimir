import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../subMenus/redux/menuSlice";

const OnImportProjectFile = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU));
};

export default OnImportProjectFile;
