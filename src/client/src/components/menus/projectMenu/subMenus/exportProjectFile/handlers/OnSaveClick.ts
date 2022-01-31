import { TextResources } from "../../../../../../assets/text";
import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { exportProjectToFile } from "../../../../../../redux/store/project/actions";
import { Project, ProjectConverterAm } from "../../../../../../models";
import { ConvertProject } from "../../../../../../redux/sagas/project";
import { Dispatch } from "redux";

const OnSaveClick = (dispatch: Dispatch, project: Project, fileName: string, parserId: string) => {
  if (!project) {
    throw Error(TextResources.Error_ExportProject);
  }

  const convertedProject = ConvertProject(project);

  const converter = {
    project: convertedProject,
    filename: fileName,
    parserId: parserId,
  } as ProjectConverterAm;

  dispatch(exportProjectToFile(converter));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSaveClick;
