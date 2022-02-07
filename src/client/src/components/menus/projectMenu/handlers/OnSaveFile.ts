import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../subMenus/redux/menuSlice";

const OnSaveFile = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU));
};

export default OnSaveFile;
