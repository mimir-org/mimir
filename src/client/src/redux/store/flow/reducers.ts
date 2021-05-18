import { CHANGE_FLOW_VIEW, ADD_SELECTED_CONNECTOR } from "./types";
import { VIEW_TYPE } from "../../../models/project";
import { GetView } from "../localStorage/localStorage";

const initialState = {
  view: GetView() ?? VIEW_TYPE.TREEVIEW,
  connectors: [],
};

export function flowReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FLOW_VIEW:
      return {
        ...state,
        view: action.payload.view,
      };
    case ADD_SELECTED_CONNECTOR:
      return {
        ...state,
        connectors: [...state.connectors, action.payload.connector],
      };
    default:
      return state;
  }
}
