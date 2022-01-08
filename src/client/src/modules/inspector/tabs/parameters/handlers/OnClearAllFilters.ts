import { Dispatch } from "redux";
import { removeAllAttributeFilters } from "../redux/parametersSlice";

const OnClearAllFilters = (elementId: string, dispatch: Dispatch<any>) => {
  dispatch(removeAllAttributeFilters(elementId));
};

export default OnClearAllFilters;
