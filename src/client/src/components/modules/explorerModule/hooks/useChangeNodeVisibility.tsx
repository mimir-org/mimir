import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";

export const useChangeNodeVisibility = (id: string, visible: boolean) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(changeNodeVisibility(id, !visible));
  }, [dispatch, id, visible]);
};

export default useChangeNodeVisibility;
