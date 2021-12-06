import { ProjectState } from "../../../../redux/store/project/types";
import { setProjectMenuVisibility } from "../../../menus/projectMenu/subMenus/redux/actions";
import { save } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers";

const OnSaveClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(setProjectMenuVisibility(false));

  // Clear all OffPage elements
  if (projectState.project) {
    projectState.project.nodes = projectState.project.nodes.filter((node) => !IsOffPage(node));
    projectState.project.edges = projectState.project.edges.filter(
      (edge) => !IsOffPage(edge.fromNode) && !IsOffPage(edge.toNode)
    );

    dispatch(save(projectState.project));
  }
};

export default OnSaveClick;
