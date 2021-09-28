import { removeAllAttributeFilters } from "../redux/actions";

const OnClearParameters = (nodeId: string, dispatch: any) => {
  dispatch(removeAllAttributeFilters(nodeId));
};

export default OnClearParameters;
