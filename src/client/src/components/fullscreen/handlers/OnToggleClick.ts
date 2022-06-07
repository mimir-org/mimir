import { Dispatch } from "redux";
import { Size } from "../../../assets/size/Size";
import { SetPanelHeight } from "../../../modules/inspector/helpers/SetPanelHeight";
import { changeInspectorHeight } from "../../../modules/inspector/redux/inspectorSlice";
import { setModulesVisibility } from "../../../redux/store/modules/modulesSlice";

export const OnToggleClick = (dispatch: Dispatch, isOpen: boolean, inspectorRef: React.MutableRefObject<HTMLDivElement>) => {
  SetPanelHeight(inspectorRef, isOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN);
  dispatch(changeInspectorHeight(isOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN));
  dispatch(setModulesVisibility({ visible: !isOpen, animate: true }));
};
