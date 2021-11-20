import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../menus/projectMenu/subMenus/redux/actions";

const OnImportProjectFile = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU));
};

export default OnImportProjectFile;