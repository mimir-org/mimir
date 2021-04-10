import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NODE_TYPE } from "../../../../models/project";
import {
  changeNodeVisibility,
  changeEdgeVisibility,
} from "../../../../redux/store/project/actions";
import { GetEdgesFromState, GetNodesFromState } from "../../../flow/helpers";

export const useChangeNodeVisibility = (
  nodeId: string,
  type: typeof NODE_TYPE,
  isHidden: boolean
) => {
  const dispatch = useDispatch();

  // Handle nodes
  const nodes = GetNodesFromState();
  const node = nodes.find((node) => node.id === nodeId);
  const isAspect: any = node.type === NODE_TYPE.ASPECT;

  // Handles edges linked to the node
  const edges = GetEdgesFromState();
  const edge = edges.find((edge) => edge.toNode === nodeId);
  const edgeId = edge === undefined ? undefined : edge.id;
  const isParent = edges.find((edge) => edge.fromNode === nodeId)
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
