import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../../../../models/project";
import { GetEdges } from "../../../flow/helpers";
import { Node } from "../../../../models/project";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";

export const useChangeNodeVisibility = (node: Node, type: NodeType) => {
  const dispatch = useDispatch();

  const edges = GetEdges();
  const isParent = edges.find((x) => x.fromNode === node.id) ? true : false;

  return useCallback(() => {
    dispatch(changeNodeVisibility(node, isParent, type));
  }, [dispatch, node, isParent, type]);
};

export default useChangeNodeVisibility;
