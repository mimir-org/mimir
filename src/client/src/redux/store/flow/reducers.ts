import { CHANGE_FLOW_VIEW } from "./types";
import { VIEW_TYPE } from "../../../models/project";

const initialState = {
  view: VIEW_TYPE.TREEVIEW,
};

export function flowReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FLOW_VIEW:
      return {
        ...state,
        view: action.payload.view,
      };
    default:
      return state;
  }
}
