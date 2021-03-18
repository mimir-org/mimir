import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { changeInspector } from "../../../../redux/inspector/changeInspector";
import { RootState } from "../../../../redux/store";

export const useInspectorChangeHandler = (
  index: number,
  dispatch: Dispatch<any>
) => {
  const fragments = useSelector<RootState>(
    (state) => state.inspectorReducer.list
  );

  return useCallback(() => {
    dispatch(changeInspector(index, fragments));
  }, [dispatch, index, fragments]);
};

export default useInspectorChangeHandler;
