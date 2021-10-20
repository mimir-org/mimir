import { useCallback } from "react";
import { setNodeVisibility } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { useAppDispatch } from "../../../redux/store";

export const ChangeNodeDisplay = (node: Node, project: Project) => {
  const dispatch = useAppDispatch();

  let isParent = false;
  let edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  return useCallback(() => {
    dispatch(setNodeVisibility(node, isParent));
  }, [dispatch, node, isParent]);
};

export default ChangeNodeDisplay;
