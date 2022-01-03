import { ProjectState } from "../../../../redux/store/project/types";
import { setProjectMenuVisibility } from "../../../menus/projectMenu/subMenus/redux/actions";
import { save } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers";

const OnSaveClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(setProjectMenuVisibility(false));

  const project = Object.assign({}, projectState.project);

  // Remove everything OffPage related
  project.edges = project.edges.filter((edge) => !IsOffPage(edge.fromNode) && !IsOffPage(edge.toNode));
  project.nodes = project.nodes.filter((node) => !IsOffPage(node));

  dispatch(save(project));
};

export default OnSaveClick;
