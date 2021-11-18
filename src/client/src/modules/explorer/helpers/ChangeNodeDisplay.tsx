import { setNodeVisibility } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { Dispatch } from "redux";

export const ChangeNodeDisplay = (node: Node, project: Project, dispatch: Dispatch) => {
  let isParent = false;
  const edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  return dispatch(setNodeVisibility(node, isParent));
};

export default ChangeNodeDisplay;
