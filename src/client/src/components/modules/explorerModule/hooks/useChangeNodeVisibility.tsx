import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Connector,
  NodeType,
  NODE_TYPE,
  RELATION_TYPE,
  TERMINAL_CATEGORY,
  TERMINAL_TYPE,
} from "../../../../models/project";
import { GetEdges, GetNodes } from "../../../flow/helpers";
import { isAspectNode } from "../../../flow/utils";
import {
  changeNodeVisibility,
  changeEdgeVisibility,
} from "../../../../redux/store/project/actions";
// import { Edge, Node } from "../../../../models/project";

export const useChangeNodeVisibility = (
  nodeId: string,
  type: NodeType,
  isHidden: boolean
) => {
  const dispatch = useDispatch();

  // Handle nodes
  const nodes = GetNodes();
  const node = nodes.find((node) => node.id === nodeId);
  const nodeType = node.type;
  const isAspect = isAspectNode(node.type);

  // Handles edges linked to the node
  const edges = GetEdges();
  const edge = edges.find((edge) => edge.toNode === nodeId);
  const edgeId = edge === undefined ? undefined : edge.id;

  // Child node if parent
  const nodeNextEdge = edges.find((x) => x.fromNode === nodeId);
  const nextChildNode =
    nodeNextEdge === undefined
      ? undefined
      : nodes.find((x) => x.id === nodeNextEdge.toNode);
  const nextChildType =
    nextChildNode === undefined ? undefined : nextChildNode.type;

  const isLinkedToNode = nodeNextEdge === undefined ? false : true;
  const hasRelationConnector =
    nextChildType === undefined ? false : nextChildType === nodeType;

  const isParent = isLinkedToNode && hasRelationConnector;

  return useCallback(() => {
    dispatch(changeNodeVisibility(node, !isHidden, isAspect, isParent, type));
    if (edgeId !== undefined) {
      dispatch(changeEdgeVisibility(edgeId, !isHidden));
    }
  }, [dispatch, node, isHidden, isAspect, isParent, type, edgeId]);
};

export default useChangeNodeVisibility;
