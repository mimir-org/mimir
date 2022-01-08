import { changeActiveMenu } from "../subMenus/redux/menuSlice";
import { MENU_TYPE } from "../../../../models/project";

const OnCommitClick = (dispatch: any) => {
  dispatch(changeActiveMenu(MENU_TYPE.COMMIT_PROJECT));
};

export default OnCommitClick;
