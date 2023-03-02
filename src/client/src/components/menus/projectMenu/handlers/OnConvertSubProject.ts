import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../lib/models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnConvertSubProject = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.CONVERT_SUB_PROJECT_MENU));
};
