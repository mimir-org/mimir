import { Dispatch } from "redux";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";

const OnLegendClick = (dispatch: Dispatch, open: boolean, legendKey: string) => {
  dispatch(setModuleVisibility({ type: legendKey, visible: !open, animate: true }));
};

export default OnLegendClick;
