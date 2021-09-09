import { setModuleVisibility } from "../../../../redux/store/modules/actions";

const OnToggleClick = (dispatch: any, open: boolean, type: string) => {
  dispatch(setModuleVisibility(type, !open, true));
};

export default OnToggleClick;
