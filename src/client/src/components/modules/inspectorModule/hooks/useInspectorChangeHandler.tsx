import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInspector } from "../../../../redux/inspector/actions/changeInspector";
import { RootState } from "../../../../redux/store";

export const useInspectorChangeHandler = (index: number) => {
  const fragments = useSelector<RootState>(
    (state) => state.inspectorReducer.list
  );
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(changeInspector(index, fragments));
  }, [dispatch, index, fragments]);
};

export default useInspectorChangeHandler;
