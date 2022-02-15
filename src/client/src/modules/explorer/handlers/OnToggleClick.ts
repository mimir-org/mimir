import { Dispatch } from "redux";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";

export const OnToggleClick = (dispatch: Dispatch, open: boolean, type: string) => {
  dispatch(setModuleVisibility({ type: type, visible: !open, animate: true }));
};
