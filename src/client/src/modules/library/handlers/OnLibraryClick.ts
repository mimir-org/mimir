import { Dispatch } from "redux";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";

const OnLibraryClick = (dispatch: Dispatch, open: boolean, libraryKey: string, legendKey: string) => {
  dispatch(setModuleVisibility({ type: libraryKey, visible: !open, animate: true }));
  dispatch(setModuleVisibility({ type: legendKey, visible: !open, animate: true }));
};

export default OnLibraryClick;
