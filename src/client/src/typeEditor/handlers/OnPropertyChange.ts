import { Dispatch } from "redux";
import { CreateLibraryType } from "../../models";
import { ResetRedux } from "../helpers";
import { updateValue } from "../redux/actions";

export const OnPropertyChange = <K extends keyof CreateLibraryType>(key: K, value: CreateLibraryType[K], dispatch: Dispatch) => {
  ResetRedux(dispatch, key, value);
  dispatch(updateValue(key, value));
};
