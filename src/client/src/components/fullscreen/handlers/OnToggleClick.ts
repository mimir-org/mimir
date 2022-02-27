import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/inspectorSlice";
import { setModulesVisibility } from "../../../redux/store/modules/modulesSlice";

export const OnToggleClick = (dispatch: Dispatch, isOpen: boolean, inspectorRef: React.MutableRefObject<HTMLDivElement>) => {
  SetPanelHeight(inspectorRef, isOpen ? Size.ModuleClosed : Size.ModuleOpen);
  dispatch(changeInspectorHeight(isOpen ? Size.ModuleClosed : Size.ModuleOpen));
  dispatch(setModulesVisibility({ visible: !isOpen, animate: true }));
};
