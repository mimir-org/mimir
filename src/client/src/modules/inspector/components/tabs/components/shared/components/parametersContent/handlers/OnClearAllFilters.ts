import { Dispatch } from "redux";
import { removeAllAttributeFilters } from "../../../../parameters/redux/parametersSlice";

export const OnClearAllFilters = (elementId: string, dispatch: Dispatch) => {
  dispatch(removeAllAttributeFilters(elementId));
};
