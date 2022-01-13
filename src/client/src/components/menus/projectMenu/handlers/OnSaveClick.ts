import { ProjectState } from "../../../../redux/store/project/types";
import { setProjectMenuVisibility } from "../subMenus/redux/menuSlice";
import { save } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers";
import { Dispatch } from "redux";

const OnSaveClick = (dispatch: Dispatch, projectState: ProjectState): void => {
  dispatch(setProjectMenuVisibility(false));

  const project = Object.assign({}, projectState.project);

  // Remove everything OffPage related
  project.edges = project.edges.filter((edge) => !IsOffPage(edge.fromNode) && !IsOffPage(edge.toNode));
  project.nodes = project.nodes.filter((node) => !IsOffPage(node));

  dispatch(save(project));
};

export default OnSaveClick;
