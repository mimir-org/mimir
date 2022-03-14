import { TextResources } from "../../../../../../../assets/text/TextResources";
import { changeActiveMenu } from "../../redux/menuSlice";
import { exportProjectToFile } from "../../../../../../../redux/store/project/actions";
import { Project, ProjectConverterAm } from "../../../../../../../models";
import { ConvertProject } from "../../../../../../../redux/sagas/project";
import { Dispatch } from "redux";

const OnExportProjectFileClick = (dispatch: Dispatch, project: Project, fileName: string, parserId: string) => {
  if (!project) throw Error(TextResources.ERROR_EXPORT_PROJECT);

  const convertedProject = ConvertProject(project);

  const converter = {
    project: convertedProject,
    filename: fileName,
    parserId: parserId,
  } as ProjectConverterAm;

  dispatch(exportProjectToFile(converter));
  dispatch(changeActiveMenu(null));
};

export default OnExportProjectFileClick;
