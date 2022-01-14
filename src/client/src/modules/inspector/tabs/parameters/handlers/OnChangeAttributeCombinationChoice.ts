import { Dispatch } from "redux";
import { CombinedAttribute } from "../../../../../models";
import { addCombinedAttribute, removeCombinedAttribute } from "../redux/parametersSlice";

const OnChangeAttributeCombinationChoice = (
  elementId: string,
  filterName: string,
  combination: CombinedAttribute,
  selected: boolean,
  dispatch: Dispatch
) => {
  if (!selected) {
    dispatch(addCombinedAttribute({ elementId, filterName, combination }));
  } else {
    dispatch(removeCombinedAttribute({ elementId, filterName, combination }));
  }
};

export default OnChangeAttributeCombinationChoice;
