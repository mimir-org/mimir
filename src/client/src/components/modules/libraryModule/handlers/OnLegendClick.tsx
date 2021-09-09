import { setModuleVisibility } from "../../../../redux/store/modules/actions";

const OnLegendClick = (dispatch: any, open: boolean, legendKey: string) => {
  dispatch(setModuleVisibility(legendKey, !open, true));
};

export default OnLegendClick;
