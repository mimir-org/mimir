import { Action, Dispatch } from "redux";
import { Size } from "../../../../../compLibrary/size/Size";
import { SetPanelHeight } from "../../../helpers";

/**
 * Function to open/close the Inspector Module.
 * @param dispatch
 * @param type - Module type
 * @param open
 */
export const OnToggleClick = (
  dispatch: Dispatch,
  open: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  changeInspectorVisibilityAction: (visibility: boolean) => Action,
  changeInspectorHeightAction: (height: number) => Action
) => {
  dispatch(changeInspectorVisibilityAction(!open));
  dispatch(changeInspectorHeightAction(open ? Size.MODULE_CLOSED : Size.MODULE_OPEN));
  SetPanelHeight(inspectorRef, open ? Size.MODULE_CLOSED : Size.MODULE_OPEN);
};
