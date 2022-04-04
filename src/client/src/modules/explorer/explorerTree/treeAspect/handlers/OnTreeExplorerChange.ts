import { Dispatch } from "redux";
import { setNodeVisibility } from "../../../../../redux/store/project/actions";
import { Node, Project } from "../../../../../models";

/**
 * Handler for changing visibility of a node in the TreeView's Explorer.
 * @param node
 * @param project
 * @param dispatch
 */
export const OnTreeExplorerChange = (node: Node, project: Project, dispatch: Dispatch) => {
  let isParent = false;

  const edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  dispatch(setNodeVisibility(node, isParent));
};
