import { useCallback } from "react";
import { useSelector } from "react-redux";
import { changeInspector } from "../../../../redux/inspector/changeInspector";
import { RootState } from "../../../../redux/store";

export const useInspectorChangeHandler = (value: string, dispatch) => {
  const fragments = useSelector<RootState>(
    (state) => state.inspectorReducer.list
  );

  return useCallback(() => {
    dispatch(changeInspector(value, fragments));
  }, [dispatch, value, fragments]);
};

export default useInspectorChangeHandler;
