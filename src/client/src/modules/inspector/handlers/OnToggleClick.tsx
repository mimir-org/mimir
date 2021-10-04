import { Size } from "../../../compLibrary";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { SetPanelHeight } from "../helpers";
import { changeInspectorHeight } from "../redux/height/actions";

/**
 * Function to open/close the Inspector Module.
 * @param dispatch
 * @param type - Module type
 * @param open
 * @param height
 */
const OnToggleClick = (dispatch: any, type: string, open: boolean, height: number) => {
  dispatch(setModuleVisibility(type, !open, true));
  if (open) {
    dispatch(changeInspectorHeight(Size.ModuleClosed));
    SetPanelHeight(Size.ModuleClosed);
  } else {
    dispatch(changeInspectorHeight(Size.ModuleOpen));
    SetPanelHeight(Size.ModuleOpen);
  }
};

export default OnToggleClick;
