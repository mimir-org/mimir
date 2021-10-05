import { ATTRIBUTE_TAB } from "../../../../models/project";
import { CHANGE_INSPECTOR_COMPONENT, InspectorActionTypes } from "./types";

const initialState = {
  tabs: [
    {
      type: ATTRIBUTE_TAB.ADMIN_INFO,
      visible: false,
    },
    {
      type: ATTRIBUTE_TAB.PARAMETERS,
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

export const inspectorReducer = (state = initialState, action: InspectorActionTypes) => {
  if (action.type === CHANGE_INSPECTOR_COMPONENT) {
    return {
      ...state,
      tabs: state.tabs.map((tab, index) =>
        index === action.payload.index
          ? {
              ...tab,
              visible: true,
            }
          : { ...tab, visible: false }
      ),
    };
  }
  return state;
};

export default inspectorReducer;
