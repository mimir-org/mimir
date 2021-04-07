import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeVisibility } from "../../../../redux/store/project/actions";
import { RootState } from "../../../../redux/store";

export const useChangeNodeVisibility = (id: string, visible: boolean) => {
  const dispatch = useDispatch();
  console.log("id fra use: ", id);

  return useCallback(() => {
    dispatch(changeVisibility(id, !visible));
  }, [dispatch, id, visible]);
};

export default useChangeNodeVisibility;
