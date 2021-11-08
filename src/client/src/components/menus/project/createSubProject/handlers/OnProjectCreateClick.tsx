import { changeActiveMenu, setAccountMenuVisibility } from "../../../project/redux/actions";
import { createSubProject } from "../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnSubProjectCreateClick = (projectName: string, nodeIds: string[], edgeIds: string[], dispatch: Dispatch) => {
  dispatch(createSubProject(projectName, projectName, nodeIds, edgeIds));
  dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(false));
};

export default OnSubProjectCreateClick;
