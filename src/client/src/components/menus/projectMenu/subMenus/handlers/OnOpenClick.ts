import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../../models/project";
import { changeActiveMenu } from "../redux/menuSlice";

const OnOpenClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
};

export default OnOpenClick;
