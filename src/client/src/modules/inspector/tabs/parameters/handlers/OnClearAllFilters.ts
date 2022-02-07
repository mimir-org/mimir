import { Dispatch } from "redux";
import { removeAllAttributeFilters } from "../redux/parametersSlice";

const OnClearAllFilters = (elementId: string, dispatch: Dispatch) => {
  dispatch(removeAllAttributeFilters(elementId));
};

export default OnClearAllFilters;
