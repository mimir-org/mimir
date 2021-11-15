import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { setModulesVisibility } from "../../../redux/store/modules/actions";

const OnToggleClick = (dispatch: Dispatch, isOpen: boolean, inspectorRef: React.MutableRefObject<HTMLDivElement>) => {
  SetPanelHeight(inspectorRef, isOpen ? Size.ModuleClosed : Size.ModuleOpen);
  dispatch(changeInspectorHeight(isOpen ? Size.ModuleClosed : Size.ModuleOpen));
  dispatch(setModulesVisibility(!isOpen, true));
};

export default OnToggleClick;
