import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../../../redux/store/projectMenu/actions";

const OnSaveLibraryFile = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.SAVE_LIBRARY_FILE_MENU));
};

export default OnSaveLibraryFile;
