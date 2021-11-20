import { changeActiveMenu } from "../../redux/actions";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeActiveMenu(null));
};

export default OnReturnClick;
