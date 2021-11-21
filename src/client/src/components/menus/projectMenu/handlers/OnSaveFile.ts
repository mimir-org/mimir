import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../menus/projectMenu/subMenus/redux/actions";

const OnSaveFile = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU));
};

export default OnSaveFile;
