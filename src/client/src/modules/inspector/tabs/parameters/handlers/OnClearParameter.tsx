import { Attribute } from "../../../../../models";
import { removeEntityParameter } from "../redux/actions";

const OnClearParameter = (nodeId: string, value: Attribute, dispatch: any) => {
  dispatch(removeEntityParameter(nodeId, value));
};

export default OnClearParameter;
