import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../../../../models/project";
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
  const isParent: boolean = edges.find(
    (edge: { fromNode: string }) => edge.fromNode === nodeId
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
