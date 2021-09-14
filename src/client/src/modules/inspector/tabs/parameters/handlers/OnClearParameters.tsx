import { removeEntityParameters } from "../redux/actions";

const OnClearParameters = (dispatch: any) => {
  dispatch(removeEntityParameters());
};

export default OnClearParameters;
