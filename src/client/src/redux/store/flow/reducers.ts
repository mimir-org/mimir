import { CHANGE_FLOW_VIEW, ADD_SELECTED_CONNECTOR } from "./types";
import { VIEW_TYPE } from "../../../models/project";

const initialState = {
  view: [
    {
      type: VIEW_TYPE.BLOCKVIEW,
      visible: true,
    },
    {
      type: VIEW_TYPE.TREEVIEW,
      visible: true,
    },
  ],
  connectors: [],
};

export function flowReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FLOW_VIEW:
      return {
        ...state,
        view: state.view.map((x, i) =>
          state.view[i].type === action.payload.key
            ? {
                ...x,
                visible: action.payload.visible,
              }
            : { ...x }
        ),
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
