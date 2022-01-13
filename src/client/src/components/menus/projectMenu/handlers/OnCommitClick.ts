import { changeActiveMenu } from "../subMenus/redux/menuSlice";
import { MENU_TYPE } from "../../../../models/project";
import { Dispatch } from "redux";

const OnCommitClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.COMMIT_PROJECT));
};

export default OnCommitClick;
