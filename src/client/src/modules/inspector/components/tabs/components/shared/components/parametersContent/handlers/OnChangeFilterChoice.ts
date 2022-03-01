import { Dispatch } from "redux";
import { addAttributeFilter, removeAttributeFilter } from "../../../../parameters/redux/parametersSlice";

export const OnChangeFilterChoice = (elementId: string, filterName: string, selected: boolean, dispatch: Dispatch) => {
  if (!selected) {
    dispatch(addAttributeFilter({ elementId, filterName }));
  } else {
    dispatch(removeAttributeFilter({ elementId, filterName }));
  }
};
