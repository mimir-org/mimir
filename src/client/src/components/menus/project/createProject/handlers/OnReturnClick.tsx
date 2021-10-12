import { changeActiveMenu } from "../../../project/redux/actions";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeActiveMenu(null));
};

export default OnReturnClick;
