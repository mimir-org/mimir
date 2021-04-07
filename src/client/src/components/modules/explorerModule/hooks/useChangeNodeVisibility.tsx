import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeVisibility } from "../../../../redux/store/project/actions";

export const useChangeNodeVisibility = (id: string, visible: boolean) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(changeVisibility(id, !visible));
  }, [dispatch, id, visible]);
};

export default useChangeNodeVisibility;
