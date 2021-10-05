import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../../redux/store/projectMenu/actions";

const OnImportLibraryFile = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.IMPORT_LIBRARY_FILE_MENU));
};

export default OnImportLibraryFile;
