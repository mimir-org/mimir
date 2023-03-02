import { AnyAction, Dispatch } from "redux";
import { MENU_TYPE } from "../../../../lib/models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnCloseProjectClick = (dispatch: React.Dispatch<AnyAction>) => {
  dispatch(changeActiveMenu(MENU_TYPE.CLOSE_PROJECT_MENU));
};
