import { useCallback } from "react";
import { Dispatch } from "redux";
import { changeToggleExplorer } from "../../../../redux/explorer/actions/changeToggleExplorer";

export const useExplorerToggleChangeHandler = (
  dispatch: Dispatch<any>,
  visible
) => {
  return useCallback(() => {
    dispatch(changeToggleExplorer(visible));
  }, [dispatch, visible]);
};

export default useExplorerToggleChangeHandler;
