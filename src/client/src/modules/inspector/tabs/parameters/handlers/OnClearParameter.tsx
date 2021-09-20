import { removeEntityParameter } from "../redux/actions";

const OnClearParameter = (
  nodeId: string,
  parameterId: string,
  dispatch: any
) => {
  dispatch(removeEntityParameter(nodeId, parameterId));
};

export default OnClearParameter;
