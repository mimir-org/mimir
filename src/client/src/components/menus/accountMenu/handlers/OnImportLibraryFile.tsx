import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";

const OnImportLibraryFile = (dispatch: any) => {
  dispatch(changeMenu(MENU_TYPE.IMPORT_LIBRARY_FILE_MENU, true));
};

export default OnImportLibraryFile;
