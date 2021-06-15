import { ATTRIBUTE_TAB } from "../../../models/project";
import { CHANGE_INSPECTOR_COMPONENT } from "./types";

const initialState = {
  tabs: [
    {
      type: ATTRIBUTE_TAB.ADMIN_INFO,
      visible: false,
    },
    {
      type: ATTRIBUTE_TAB.TECH_INFO,
      visible: false,
    },
    {
      type: ATTRIBUTE_TAB.RELATIONS,
      visible: false,
    },
    {
      type: ATTRIBUTE_TAB.TERMINALS,
      visible: false,
    },
  ],
};

export const inspectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INSPECTOR_COMPONENT:
      return {
        ...state,
        tabs: state.tabs.map((x, index) =>
          index === action.payload.index
            ? {
                ...x,
                visible: true,
              }
            : { ...x, visible: false }
        ),
      };
    default:
      return state;
  }
};

export default inspectorReducer;
