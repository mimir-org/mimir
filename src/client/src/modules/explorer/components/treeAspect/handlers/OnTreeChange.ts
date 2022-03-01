import { setNodeVisibility } from "../../../../../redux/store/project/actions";
import { Node, Project } from "../../../../../models";
import { Dispatch } from "redux";

export const OnTreeChange = (node: Node, project: Project, dispatch: Dispatch) => {
  let isParent = false;
  const edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  dispatch(setNodeVisibility(node, isParent));
};
