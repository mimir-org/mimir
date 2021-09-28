import { CombinedAttribute } from "../../../../../models";
import {
  addCombinedAttribute,
  removeCombinedAttribute,
} from "../redux/actions";

const OnChangeFilterCombination = (
  nodeId: string,
  filterName: string,
  combination: CombinedAttribute,
  selected: boolean,
  dispatch: any
) => {
  if (!selected) {
    dispatch(addCombinedAttribute(nodeId, filterName, combination));
  } else {
    dispatch(removeCombinedAttribute(nodeId, filterName, combination));
  }
};

export default OnChangeFilterCombination;
