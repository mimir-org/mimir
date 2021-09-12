import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import { exportLibrary } from "../../../../redux/store/library/actions";

const OnSaveClick = (dispatch: any, fileName: string) => {
  dispatch(exportLibrary(fileName));
  dispatch(changeMenu(MENU_TYPE.SAVE_LIBRARY_FILE_MENU, false));
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
};

export default OnSaveClick;
