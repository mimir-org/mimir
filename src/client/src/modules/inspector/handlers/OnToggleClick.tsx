import { Size } from "../../../compLibrary";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { SetPanelHeight } from "../helpers";
import { changeInspectorHeight } from "../redux/height/actions";

/**
 * Function to open/close the Inspector Module.
 * @param dispatch
 * @param type - Module type
 * @param open
 */
const OnToggleClick = (
  dispatch: any,
  type: string,
  open: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  dispatch(setModuleVisibility(type, !open, true));
  if (open) {
    dispatch(changeInspectorHeight(Size.ModuleClosed));
    SetPanelHeight(inspectorRef, Size.ModuleClosed);
  } else {
    dispatch(changeInspectorHeight(Size.ModuleOpen));
    SetPanelHeight(inspectorRef, Size.ModuleOpen);
  }
};

export default OnToggleClick;
