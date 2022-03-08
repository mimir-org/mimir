import { Dispatch } from "redux";
import { CombinedAttribute } from "../../../../../../../../../models";
import { addCombinedAttribute, removeCombinedAttribute } from "../../../../parameters/redux/parametersSlice";

export const OnChangeAttributeCombinationChoice = (
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
