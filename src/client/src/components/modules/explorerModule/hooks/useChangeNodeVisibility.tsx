import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Connector,
  NodeType,
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

export const useChangeNodeVisibility = (
  nodeId: string,
  type: NodeType,
  isHidden: boolean
) => {
  const dispatch = useDispatch();

  // Handle nodes
  const nodes = GetNodes();
  const node = nodes.find((node: { id: string }) => node.id === nodeId);
  const isAspect: boolean = isAspectNode(node.type);

  // Handles edges linked to the node
  const edges = GetEdges();
  const edge = edges.find((edge: { toNode: string }) => edge.toNode === nodeId);
  const edgeId: string = edge === undefined ? undefined : edge.id;

  const connector =
    edge === undefined
      ? undefined
      : node.connectors.find((x) => x.id === edge.fromConnector);

  const isParent: boolean =
    connector === undefined
      ? false
      : edges.find(
          (edge: { fromNode: string }) =>
            edge.fromNode === nodeId &&
            connector.relationType === RELATION_TYPE.PartOf
        )
      ? true
      : false;

  return useCallback(() => {
    dispatch(changeNodeVisibility(nodeId, !isHidden, isAspect, isParent, type));
    if (edgeId !== undefined) {
      dispatch(changeEdgeVisibility(edgeId, !isHidden));
    }
  }, [dispatch, nodeId, isHidden, isAspect, isParent, type, edgeId]);
};

export default useChangeNodeVisibility;
