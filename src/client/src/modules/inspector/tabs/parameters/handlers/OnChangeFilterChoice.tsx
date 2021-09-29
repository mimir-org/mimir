import { Dispatch } from "redux";
import { addAttributeFilter, removeAttributeFilter } from "../redux/actions";

const OnChangeFilterChoice = (
  nodeId: string,
  filterName: string,
  selected: boolean,
  dispatch: Dispatch<any>
) => {
  if (!selected) {
    dispatch(addAttributeFilter(nodeId, filterName));
  } else {
    dispatch(removeAttributeFilter(nodeId, filterName));
  }
};

export default OnChangeFilterChoice;
