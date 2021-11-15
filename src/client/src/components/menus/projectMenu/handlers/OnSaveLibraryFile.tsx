import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../menus/projectMenu/subMenus/redux/actions";

const OnSaveLibraryFile = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.SAVE_LIBRARY_FILE_MENU));
};

export default OnSaveLibraryFile;
