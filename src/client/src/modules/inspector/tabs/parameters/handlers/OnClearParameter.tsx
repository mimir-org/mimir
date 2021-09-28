import { removeAttributeFilter } from "../redux/actions";

const OnClearParameter = (
  nodeId: string,
  parameterId: string,
  dispatch: any
) => {
  dispatch(removeAttributeFilter(nodeId, parameterId));
};

export default OnClearParameter;
