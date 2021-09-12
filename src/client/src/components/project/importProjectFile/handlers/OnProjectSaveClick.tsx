import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import { importProjectAction } from "../../../../redux/store/project/actions";
import { ProjectAm } from "../../../../redux/sagas/project/ConvertProject";

const OnProjectSaveClick = (dispatch: any, data: () => ProjectAm) => {
  const project = data();
  dispatch(importProjectAction(project));
  dispatch(changeMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU, false));
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
};

export default OnProjectSaveClick;
