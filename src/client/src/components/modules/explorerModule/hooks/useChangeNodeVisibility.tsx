import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../../../../models/project";
import { GetEdges, GetNodes } from "../../../flow/helpers";
import { isAspectNode } from "../../../flow/utils";
import { Node } from "../../../../models/project";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";

export const useChangeNodeVisibility = (node: Node, type: NodeType) => {
  const dispatch = useDispatch();

  // Handle nodes
  const nodes = GetNodes();
  const nodeType = node.type;
  const isAspect = isAspectNode(node.type);

  // Handles edges linked to the node
  const edges = GetEdges();
  const edge = edges.find((edge) => edge.toNode === node.id);
  const edgeId = edge === undefined ? undefined : edge.id;

  // Child node if parent
  const nodeNextEdge = edges.find((x) => x.fromNode === node.id);

  const nextChildNode =
    nodeNextEdge === undefined
      ? undefined
      : nodes.find((x) => x.id === nodeNextEdge.toNode);

  const nextChildType =
    nextChildNode === undefined ? undefined : nextChildNode.type;

  const isSameType =
    nextChildType === undefined ? false : nextChildType === nodeType;

  const isParent = edges.find((x) => x.fromNode === node.id) && isSameType;

  return useCallback(() => {
    dispatch(
      changeNodeVisibility(
        node,
        !node.isHidden,
        isAspect,
        isParent,
        type,
        edgeId
      )
    );
  }, [dispatch, node, isAspect, isParent, type, edgeId]);
};

export default useChangeNodeVisibility;
