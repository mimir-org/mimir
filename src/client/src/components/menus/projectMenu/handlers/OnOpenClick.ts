import { AnyAction, Dispatch } from "redux";
import { MENU_TYPE } from "../../../../lib/models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnOpenClick = (dispatch: React.Dispatch<AnyAction>) => {
  dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
};
