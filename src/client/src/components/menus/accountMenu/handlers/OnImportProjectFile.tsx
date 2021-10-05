import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../../redux/store/projectMenu/actions";

const OnImportProjectFile = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU));
};

export default OnImportProjectFile;
