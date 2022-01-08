import { changeActiveMenu } from "../../redux/menuSlice";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeActiveMenu(null));
};

export default OnReturnClick;
