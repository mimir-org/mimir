import { TextResources } from "../../../../../../../assets/text/TextResources";
import { changeActiveMenu } from "../../redux/menuSlice";
// import { exportProjectToFile } from "../../../../../../../redux/store/project/actions";
// import { Project, ProjectConverterAm } from "@mimirorg/modelbuilder-types";
// import { ConvertProjectToProjectAm } from "../../../../../../../redux/sagas/project";
import { Dispatch } from "redux";
import { Project, ProjectConverterAm } from "lib";

const OnExportProjectFileClick = (dispatch: Dispatch, project: Project, fileName: string, parserId: string) => {
  if (!project) throw Error(TextResources.ERROR_EXPORT_PROJECT);

  // const convertedProject = ConvertProjectToProjectAm(project);

  // const converter: ProjectConverterAm = {
  //   project: convertedProject,
  //   fileName: fileName,
  //   parserId: parserId,
  // };

  // dispatch(exportProjectToFile(converter));
  dispatch(changeActiveMenu(null));
};

export default OnExportProjectFileClick;
