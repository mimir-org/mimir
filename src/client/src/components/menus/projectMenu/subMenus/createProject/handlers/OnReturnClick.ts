import { IsStartPage } from "../../../../../../helpers";
import { MENU_TYPE } from "../../../../../../models/project";
import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/actions";

const OnReturnClick = (dispatch: any) => {
  const newActiveMenu = IsStartPage() ? MENU_TYPE.INSTRUCTION_PROJECT_MENU : null;
  dispatch(changeActiveMenu(newActiveMenu));
  dispatch(setProjectMenuVisibility(false));
};

export default OnReturnClick;
