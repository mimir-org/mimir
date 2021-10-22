import { Action } from "redux";
import { Size } from "../../../compLibrary";
import { SetPanelHeight } from "../helpers";

/**
 * Function to open/close the Inspector Module.
 * @param dispatch
 * @param type - Module type
 * @param open
 */
const OnToggleClick = (
  dispatch: any,
  open: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  changeInspectorVisibilityAction: (visibility: boolean) => Action,
  changeInspectorHeightAction: (height: number) => Action
) => {
  dispatch(changeInspectorVisibilityAction(!open));
  if (open) {
    dispatch(changeInspectorHeightAction(Size.ModuleClosed));
    SetPanelHeight(inspectorRef, Size.ModuleClosed);
  } else {
    dispatch(changeInspectorHeightAction(Size.ModuleOpen));
    SetPanelHeight(inspectorRef, Size.ModuleOpen);
  }
};

export default OnToggleClick;
