import { ProjectState } from "../../../../redux/store/project/types";
import { setProjectMenuVisibility } from "../../../menus/projectMenu/subMenus/redux/actions";
import { removeEdge, removeNode, save } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers";

const OnSaveClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(setProjectMenuVisibility(false));

  // Clear all OffPage elements
  if (projectState.project) {
    projectState.project.edges?.forEach((edge) => {
      if (IsOffPage(edge.fromNode) || IsOffPage(edge.toNode)) {
        dispatch(removeEdge(edge.id));
      }
    });

    projectState.project.nodes?.forEach((node) => {
      if (IsOffPage(node)) dispatch(removeNode(node.id));
    });

    setTimeout(() => {
      dispatch(save(projectState.project));
    }, 1000);
  }
};

export default OnSaveClick;
