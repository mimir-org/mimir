import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";

const OnImportProjectFile = (dispatch: any) => {
  dispatch(changeMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU, true));
};

export default OnImportProjectFile;
