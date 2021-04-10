import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NODE_TYPE } from "../../../../models/project";
import {
  changeNodeVisibility,
  changeEdgeVisibility,
} from "../../../../redux/store/project/actions";
import { GetEdgesFromState } from "../../../flow/helpers";

export const useChangeNodeVisibility = (
  nodeId: string,
  type: typeof NODE_TYPE,
  isAspect: boolean,
  isHidden: boolean
) => {
  const dispatch = useDispatch();

  // Find edges that are linked to the node
  const edges = GetEdgesFromState();
  const edge = edges.find((edge) => edge.toNode === nodeId);
  const edgeId = edge === undefined ? undefined : edge.id;

  return useCallback(() => {
    dispatch(changeNodeVisibility(nodeId, !isHidden, isAspect, type));
    if (edgeId !== undefined) {
      dispatch(changeEdgeVisibility(edgeId, !isHidden));
    }
  }, [dispatch, nodeId, isHidden, isAspect, type, edgeId]);
};

export default useChangeNodeVisibility;
