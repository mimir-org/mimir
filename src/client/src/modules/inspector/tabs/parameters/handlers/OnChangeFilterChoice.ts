import { Dispatch } from "redux";
import { addAttributeFilter, removeAttributeFilter } from "../redux/parametersSlice";

const OnChangeFilterChoice = (elementId: string, filterName: string, selected: boolean, dispatch: Dispatch) => {
  if (!selected) {
    dispatch(addAttributeFilter({ elementId, filterName }));
  } else {
    dispatch(removeAttributeFilter({ elementId, filterName }));
  }
};

export default OnChangeFilterChoice;
