import { Size } from "../../../../compLibrary";
import { setModuleVisibility } from "../../../../redux/store/modules/actions";
import { SetPanelHeight } from "./../helpers";

const OnToggleClick = (dispatch: any, type: string, open: boolean) => {
  dispatch(setModuleVisibility(type, !open, true));
  const panel = document.getElementById("InspectorModule");

  if (panel.style.height === Size.ModuleClosed + "px")
    SetPanelHeight(Size.InspectorModuleOpen);
  else SetPanelHeight(Size.ModuleClosed);
};

export default OnToggleClick;
