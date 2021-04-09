import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NODE_TYPE } from "../../../../models/project";
import {
  changeNodeVisibility,
  changeEdgeVisibility,
} from "../../../../redux/store/project/actions";

export const useChangeNodeVisibility = (
  id: string,
  type: typeof NODE_TYPE,
  edgeId: string,
  isAspect: boolean,
  isHidden: boolean,
  edgeHidden: boolean
) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(changeNodeVisibility(id, !isHidden, isAspect, type));

    if (edgeId !== undefined) {
      dispatch(changeEdgeVisibility(edgeId, !edgeHidden));
    }
  }, [dispatch, id, isHidden, isAspect, type, edgeId, edgeHidden]);
};

export default useChangeNodeVisibility;
