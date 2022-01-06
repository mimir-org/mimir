import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";

const OnLegendClick = (dispatch: any, open: boolean, legendKey: string) => {
  dispatch(setModuleVisibility({type: legendKey, visible: !open, animate: true}));
};

export default OnLegendClick;
