import { TextResources } from "../../../../assets/text";
import { ProjectState } from "../../../../redux/store/project/types";
import { changeActiveMenu, setAccountMenuVisibility } from "../../../../redux/store/projectMenu/actions";
import { save, exportProjectToFile } from "../../../../redux/store/project/actions";

const OnSaveClick = (dispatch: any, projectState: ProjectState, fileName: string) => {
  if (!projectState.project) {
    throw Error(TextResources.Error_ExportProject);
  }

  dispatch(save(projectState.project));
  dispatch(exportProjectToFile(projectState.project, fileName, true));

  dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(false));
};

export default OnSaveClick;
