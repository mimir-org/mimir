import { Size } from "../../";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { setModulesVisibility } from "../../../redux/store/modules/actions";

const OnToggleClick = (dispatch: any, isOpen: boolean) => {
  dispatch(changeInspectorHeight(isOpen ? Size.ModuleClosed : Size.ModuleOpen));
  dispatch(setModulesVisibility(!isOpen, true));
};

export default OnToggleClick;
