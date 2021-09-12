import { TextResources } from "../../../../assets/text";
import { MENU_TYPE } from "../../../../models/project";
import { ProjectState } from "../../../../redux/store/project/types";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import {
  save,
  exportProjectToFile,
} from "../../../../redux/store/project/actions";

const OnSaveClick = (
  dispatch: any,
  projectState: ProjectState,
  fileName: string
) => {
  if (!projectState.project) {
    throw Error(TextResources.Error_ExportProject);
  }

  dispatch(save(projectState.project));
  dispatch(exportProjectToFile(projectState.project, fileName, true));

  dispatch(changeMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU, false));
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
};

export default OnSaveClick;
