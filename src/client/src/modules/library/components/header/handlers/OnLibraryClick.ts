import { Dispatch } from "redux";
import { setModuleVisibility } from "../../../../../redux/store/modules/modulesSlice";

export const OnLibraryClick = (dispatch: Dispatch, open: boolean, libraryKey: string) =>
  dispatch(setModuleVisibility({ type: libraryKey, visible: !open, animate: true }));
