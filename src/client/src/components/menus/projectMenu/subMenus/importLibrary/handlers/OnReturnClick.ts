import { changeActiveMenu } from "../../../../projectMenu/subMenus/redux/actions";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeActiveMenu(null));
};

export default OnReturnClick;
