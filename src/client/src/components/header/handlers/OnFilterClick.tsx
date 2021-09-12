import { MENU_TYPE } from "../../../models/project";
import { changeMenu } from "../../../redux/store/projectMenu/actions";

const OnFilterClick = (dispatch: any, open: boolean) => {
  dispatch(changeMenu(MENU_TYPE.VISUAL_FILTER_MENU, !open));
};

export default OnFilterClick;
