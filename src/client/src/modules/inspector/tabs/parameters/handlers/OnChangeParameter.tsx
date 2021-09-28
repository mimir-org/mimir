import { addAttributeFilter, removeAttributeFilter } from "../redux/actions";

const OnParameterChange = (
  nodeId: string,
  filterName: string,
  selected: boolean,
  dispatch: any
) => {
  if (!selected) {
    dispatch(addAttributeFilter(nodeId, filterName));
  } else {
    dispatch(removeAttributeFilter(nodeId, filterName));
  }
};

export default OnParameterChange;
