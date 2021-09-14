import { Attribute } from "../../../../../models";
import { selectEntityParameter } from "../redux/actions";

const OnParameterChange = (value: Attribute, dispatch: any) => {
  dispatch(selectEntityParameter(value));
};

export default OnParameterChange;
