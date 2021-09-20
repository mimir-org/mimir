import { removeEntityParameters } from "../redux/actions";

const OnClearParameters = (nodeId: string, dispatch: any) => {
  dispatch(removeEntityParameters(nodeId));
};

export default OnClearParameters;
