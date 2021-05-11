import { CHANGE_FLOW_VIEW } from "./types";
import { VIEW_TYPE } from "../../../models/project";

const initialState = {
  view: [
    {
      type: VIEW_TYPE.BLOCKVIEW,
      visible: true,
    },
    {
      type: VIEW_TYPE.TREEVIEW,
      visible: false,
    },
  ],
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
    default:
      return state;
  }
}
