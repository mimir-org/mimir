import { Action, Dispatch } from "redux";
import { Size } from "../../../../../assets/size/Size";
import { SetPanelHeight } from "../../../helpers/SetPanelHeight";

/**
 * Component to open/close the Inspector Module.
 * @param dispatch
 * @param open
 * @param inspectorRef
 * @param changeInspectorVisibilityAction
 * @param changeInspectorHeightAction
 */
export const OnToggleInspectorClick = (
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
