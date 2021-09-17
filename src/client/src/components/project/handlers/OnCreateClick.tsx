import { MENU_TYPE } from "../../../models/project";
import { changeMenu } from "../../../redux/store/projectMenu/actions";
import { create } from "../../../redux/store/project/actions";

const OnCreateClick = (dispatch: any) => {
  dispatch(create("unnamed", "unnamed"));
  dispatch(changeMenu(MENU_TYPE.MAIN_MENU, false));
};
export default OnCreateClick;
