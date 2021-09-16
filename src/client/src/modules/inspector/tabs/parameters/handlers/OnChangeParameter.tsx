import { Attribute } from "../../../../../models";
import { addEntityParameter, removeEntityParameter } from "../redux/actions";

const OnParameterChange = (
  nodeId: string,
  value: Attribute,
  selected: boolean,
  dispatch: any
) => {
  if (!selected) {
    dispatch(addEntityParameter(nodeId, value));
  } else {
    dispatch(removeEntityParameter(nodeId, value));
  }
};

export default OnParameterChange;
