import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, false));
};

export default OnReturnClick;
