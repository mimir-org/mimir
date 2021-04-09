import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  changeNodeVisibility,
  changeEdgeVisibility,
} from "../../../../redux/store/project/actions";

export const useChangeNodeVisibility = (
  id: string,
  type: string,
  edgeId: string,
  isAspect: boolean,
  isHidden: boolean,
  edgeHidden: boolean
) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(changeNodeVisibility(id, !isHidden, isAspect, type));

    // if (edgeId !== undefined) {
    //   dispatch(changeEdgeVisibility(edgeId, !edgeHidden));
    // }
  }, [dispatch, id, isHidden, isAspect, type]);
};

export default useChangeNodeVisibility;
