import { ViewType } from "lib";
import { Dispatch } from "redux";
import { setViewType } from "store/reducers/commonReducer";

export const onViewTypeChange = (viewType: ViewType, dispatch: Dispatch) => {
  dispatch(setViewType({ view: viewType }));
};
