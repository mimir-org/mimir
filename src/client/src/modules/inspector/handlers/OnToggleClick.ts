import { Action } from "redux";
import { Size } from "../../../compLibrary/size";
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
  dispatch(changeInspectorHeightAction(open ? Size.ModuleClosed : Size.ModuleOpen));
  SetPanelHeight(inspectorRef, open ? Size.ModuleClosed : Size.ModuleOpen);
};

export default OnToggleClick;
