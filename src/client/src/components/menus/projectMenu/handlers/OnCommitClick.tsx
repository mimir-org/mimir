import { ProjectState } from "../../../../redux/store/project/types";
import { changeActiveMenu } from "../../../menus/project/redux/actions";
import { MENU_TYPE } from "../../../../models/project";

const OnCommitClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(changeActiveMenu(MENU_TYPE.COMMIT_PROJECT));
};

export default OnCommitClick;
