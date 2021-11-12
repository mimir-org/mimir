import { useCallback } from "react";
import { setNodeVisibility } from "../../../redux/store/project/actions";
import { Node } from "../../../models";
import { projectSelector, useAppDispatch, useAppSelector } from "../../../redux/store";

export const ChangeNodeDisplay = (node: Node) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);

  let isParent = false;
  const edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  return useCallback(() => {
    dispatch(setNodeVisibility(node, isParent));
  }, [dispatch, node, isParent]);
};

export default ChangeNodeDisplay;
