import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";

const OnSaveFile = (dispatch: any) => {
  dispatch(changeMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU, true));
};

export default OnSaveFile;
