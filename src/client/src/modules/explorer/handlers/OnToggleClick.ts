import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";

const OnToggleClick = (dispatch: any, open: boolean, type: string) => {
  dispatch(setModuleVisibility({type: type, visible: !open, animate: true}));
};

export default OnToggleClick;
