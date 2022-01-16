import { TextResources } from "../../../../../../assets/text";
import { ProjectState } from "../../../../../../redux/store/project/types";
import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { exportProjectToFile } from "../../../../../../redux/store/project/actions";
import { ProjectConverterAm } from "../../../../../../models";
import { ConvertProject } from "../../../../../../redux/sagas/project";
import { Dispatch } from "redux";

const OnSaveClick = (dispatch: Dispatch, projectState: ProjectState, fileName: string, parserId: string) => {
  if (!projectState.project) {
    throw Error(TextResources.Error_ExportProject);
  }

  const project = ConvertProject(projectState.project);

  const converter = {
    project: project,
    filename: fileName,
    parserId: parserId,
  } as ProjectConverterAm;

  dispatch(exportProjectToFile(converter));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSaveClick;
