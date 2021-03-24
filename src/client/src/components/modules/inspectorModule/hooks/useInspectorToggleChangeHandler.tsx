import { useCallback } from "react";
import { Dispatch } from "redux";
import { changeToggleInspector } from "../../../../redux/inspector/actions/changeToggleInspector";

export const useInspectorToggleChangeHandler = (
  dispatch: Dispatch<any>,
  visible
) => {
  return useCallback(() => {
    dispatch(changeToggleInspector(visible));
  }, [dispatch, visible]);
};

export default useInspectorToggleChangeHandler;
