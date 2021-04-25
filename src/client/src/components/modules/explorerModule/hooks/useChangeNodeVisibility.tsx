import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../../../../models/project";
import { GetEdges } from "../../../flow/helpers";
import { isAspectNode } from "../../../flow/utils";
import { Node } from "../../../../models/project";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";

export const useChangeNodeVisibility = (node: Node, type: NodeType) => {
  const dispatch = useDispatch();
  const isAspect = isAspectNode(node.type);

  // Handles edges linked to the node
  const edges = GetEdges();
  const edge = edges.find((edge) => edge.toNode === node.id);
  const edgeId = edge === undefined ? undefined : edge.id;

  const isParent = edges.find((x) => x.fromNode === node.id) ? true : false;

  return useCallback(() => {
    dispatch(changeNodeVisibility(node, isAspect, isParent, type, edgeId));
  }, [dispatch, node, isAspect, isParent, type, edgeId]);
};

export default useChangeNodeVisibility;
