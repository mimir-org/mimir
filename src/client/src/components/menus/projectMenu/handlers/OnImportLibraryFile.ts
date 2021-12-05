import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../menus/projectMenu/subMenus/redux/actions";

const OnImportLibraryFile = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.IMPORT_LIBRARY_FILE_MENU));
};

export default OnImportLibraryFile;