import { Size } from "../../../compLibrary";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { changeInspectorHeight } from "../redux/height/actions";
import { SetPanelHeight } from "./../helpers";

/**
 * Function to open/close the Inspector Module.
 * @param dispatch
 * @param type - the Inspector Module type
 * @param open
 */
const OnToggleClick = (dispatch: any, type: string, open: boolean) => {
  dispatch(setModuleVisibility(type, !open, true));
  if (open) dispatch(changeInspectorHeight(Size.ModuleClosed));
  else dispatch(changeInspectorHeight(Size.ModuleOpen));

  if (open) SetPanelHeight(Size.ModuleClosed);
  else SetPanelHeight(Size.ModuleOpen);
};

export default OnToggleClick;
