import { changeActiveMenu } from "../../../../redux/store/projectMenu/actions";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeActiveMenu(null));
};

export default OnReturnClick;
