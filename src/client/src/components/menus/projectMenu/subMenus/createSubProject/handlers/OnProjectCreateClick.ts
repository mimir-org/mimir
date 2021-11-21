import { changeActiveMenu, setProjectMenuVisibility } from "../../../../projectMenu/subMenus/redux/actions";
import { createSubProject } from "../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnSubProjectCreateClick = (
  fromProjectId: string,
  projectName: string,
  nodeIds: string[],
  edgeIds: string[],
  dispatch: Dispatch
) => {
  dispatch(createSubProject(fromProjectId, projectName, projectName, nodeIds, edgeIds));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSubProjectCreateClick;
