import { Attribute } from "../../../../../models";
import { removeEntityParameter } from "../redux/actions";

const OnClearParameter = (dispatch: any, value: Attribute) => {
  dispatch(removeEntityParameter(value));
};

export default OnClearParameter;
