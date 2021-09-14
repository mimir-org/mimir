import { Attribute } from "../../../../../models";
import { addEntityParameter } from "../redux/actions";

const OnParameterChange = (
  value: Attribute,
  dispatch: any,
  attributes: Attribute[]
) => {
  if (!attributes.some((x) => x.id === value.id))
    dispatch(addEntityParameter(value));
};

export default OnParameterChange;
