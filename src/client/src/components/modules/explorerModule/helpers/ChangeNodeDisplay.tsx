import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setNodeVisibility } from "../../../../redux/store/project/actions";
import { Node, Project } from "../../../../models";

export const ChangeNodeDisplay = (node: Node, project: Project) => {
  const dispatch = useDispatch();

  let isParent = false;
  let edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  return useCallback(() => {
    dispatch(setNodeVisibility(node, isParent));
  }, [dispatch, node, isParent]);
};

export default ChangeNodeDisplay;
