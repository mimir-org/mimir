import { ProjectState } from "../../../../redux/store/project/types";
import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import { save } from "../../../../redux/store/project/actions";

const OnSaveClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
  if (projectState.project) dispatch(save(projectState.project));
};

export default OnSaveClick;
