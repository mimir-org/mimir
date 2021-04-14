import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorVisibility } from "../../../../redux/inspector/actions/changeInspectorVisibility";
import { RootState } from "../../../../redux/store";

export const useInspectorChangeVisibilityHandler = (index: number) => {
  const components = useSelector<RootState>(
    (state) => state.inspectorReducer.list
  ) as [];
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(changeInspectorVisibility(index, components));
  }, [dispatch, index, components]);
};

export default useInspectorChangeVisibilityHandler;
