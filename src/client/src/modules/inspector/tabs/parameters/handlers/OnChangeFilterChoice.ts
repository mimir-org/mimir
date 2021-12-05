import { Dispatch } from "redux";
import { addAttributeFilter, removeAttributeFilter } from "../redux/actions";

const OnChangeFilterChoice = (elementId: string, filterName: string, selected: boolean, dispatch: Dispatch<any>) => {
  if (!selected) {
    dispatch(addAttributeFilter(elementId, filterName));
  } else {
    dispatch(removeAttributeFilter(elementId, filterName));
  }
};

export default OnChangeFilterChoice;