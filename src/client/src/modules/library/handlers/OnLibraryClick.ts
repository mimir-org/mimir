/* eslint-disable @typescript-eslint/no-explicit-any */
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";

export const OnLibraryClick = (dispatch: any, open: boolean, libraryKey: string) => {
  dispatch(setModuleVisibility({ type: libraryKey, visible: !open, animate: true }));
};
