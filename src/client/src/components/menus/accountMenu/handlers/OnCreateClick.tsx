import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";

const OnCreateClick = (dispatch: any) => {
  dispatch(changeMenu(MENU_TYPE.CREATE_PROJECT_MENU, true));
};

export default OnCreateClick;
