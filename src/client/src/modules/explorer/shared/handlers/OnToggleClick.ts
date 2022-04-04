import { Dispatch } from "redux";
import { toggleModuleVisibility } from "../../../../redux/store/modules/modulesSlice";

export const OnToggleClick = (dispatch: Dispatch, type: string) => {
  dispatch(toggleModuleVisibility(type));
};
