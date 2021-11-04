import { Dispatch } from "redux";
import { ResetRedux } from "../helpers";
import { updateValue } from "../redux/actions";

export const OnPropertyChange = (key: string, value: any, dispatch: Dispatch) => {
  ResetRedux(dispatch, key, value);
  dispatch(updateValue(key, value));
};
