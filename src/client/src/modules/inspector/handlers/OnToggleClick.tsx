import { Size } from "../../../compLibrary";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { changeInspectorHeight } from "../redux/height/actions";

/**
 * Function to open/close the Inspector Module.
 * @param dispatch
 * @param type - Module type
 * @param open
 */
const OnToggleClick = (dispatch: any, type: string, open: boolean) => {
  dispatch(setModuleVisibility(type, !open, true));
  dispatch(changeInspectorHeight(open ? Size.ModuleClosed : Size.ModuleOpen));
};

export default OnToggleClick;
