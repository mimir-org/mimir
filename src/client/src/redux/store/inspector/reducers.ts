import { ATTRIBUTE_TYPE } from "../../../models/project";

export const INSPECTOR_CHANGED = "Insceptor changed";
export const INSPECTOR_ELEMENT_CHANGED_COMPLETED =
  "INSPECTOR_ELEMENT_CHANGED_COMPLETED";

const initialState = {
  tabs: [
    {
      type: ATTRIBUTE_TYPE.ADMIN_INFO,
      visible: false,
    },
    {
      type: ATTRIBUTE_TYPE.TECH_INFO,
      visible: false,
    },
    {
      type: ATTRIBUTE_TYPE.RELATIONS,
      visible: false,
    },
  ],
};

export const inspectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSPECTOR_ELEMENT_CHANGED_COMPLETED:
      return {
        ...state,
        type: action.type,
        tabs: action.payload,
      };
    default:
      return state;
  }
};

export const changeInspector = () => ({
  type: INSPECTOR_CHANGED,
});

export default inspectorReducer;
