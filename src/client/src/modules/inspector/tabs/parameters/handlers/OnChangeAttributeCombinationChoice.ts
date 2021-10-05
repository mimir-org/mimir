import { Dispatch } from "redux";
import { CombinedAttribute } from "../../../../../models";
import { addCombinedAttribute, removeCombinedAttribute } from "../redux/actions";

const OnChangeAttributeCombinationChoice = (
  nodeId: string,
  filterName: string,
  combination: CombinedAttribute,
  selected: boolean,
  dispatch: Dispatch<any>
) => {
  if (!selected) {
    dispatch(addCombinedAttribute(nodeId, filterName, combination));
  } else {
    dispatch(removeCombinedAttribute(nodeId, filterName, combination));
  }
};

export default OnChangeAttributeCombinationChoice;
