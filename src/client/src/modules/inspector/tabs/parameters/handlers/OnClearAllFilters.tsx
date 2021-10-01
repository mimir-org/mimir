import { Dispatch } from "redux";
import { removeAllAttributeFilters } from "../redux/actions";

const OnClearAllFilters = (nodeId: string, dispatch: Dispatch<any>) => {
  dispatch(removeAllAttributeFilters(nodeId));
};

export default OnClearAllFilters;
