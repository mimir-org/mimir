import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";
import { MENU_TYPE } from "../../../../lib/models/project";
import { Dispatch } from "redux";

export const OnCommitClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.COMMIT_PROJECT_MENU));
};
