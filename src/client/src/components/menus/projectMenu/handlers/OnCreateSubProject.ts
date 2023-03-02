import { AnyAction, Dispatch } from "redux";
import { MENU_TYPE } from "../../../../lib/models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnCreateSubProject = (dispatch: React.Dispatch<AnyAction>) => {
  dispatch(changeActiveMenu(MENU_TYPE.CREATE_SUB_PROJECT_MENU));
};
