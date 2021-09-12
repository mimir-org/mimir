import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU, false));
};

export default OnReturnClick;
