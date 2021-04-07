import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeEdgeVisibility } from "../../../../redux/store/project/actions";

export const useChangeEdgeVisibility = (id: string, visible: boolean) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(changeEdgeVisibility(id, !visible));
  }, [dispatch, id, visible]);
};

export default useChangeEdgeVisibility;
