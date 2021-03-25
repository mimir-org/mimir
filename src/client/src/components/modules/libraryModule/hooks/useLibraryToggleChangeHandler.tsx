import { useCallback } from "react";
import { Dispatch } from "redux";
import { changeToggleLibrary } from "../../../../redux/library/actions/changeToggleLibrary";

export const useLibraryToggleChangeHandler = (
  dispatch: Dispatch<any>,
  visible
) => {
  return useCallback(() => {
    dispatch(changeToggleLibrary(visible));
  }, [dispatch, visible]);
};

export default useLibraryToggleChangeHandler;
