import { Attribute } from "../../../../../models";
import { addEntityParameter } from "../redux/actions";

const OnParameterChange = (
  nodeId: string,
  value: Attribute,
  attributes: Attribute[],
  dispatch: any
) => {
  if (!attributes.some((x) => x.id === value.id))
    dispatch(addEntityParameter(nodeId, value));
};

export default OnParameterChange;
