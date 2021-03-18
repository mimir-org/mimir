export const INSPECTOR_CHANGED = "Insceptor changed";
export const INSPECTOR_ELEMENT_CHANGED_COMPLETED =
  "INSPECTOR_ELEMENT_CHANGED_COMPLETED";

const initialState = {
  list: [
    {
      type: "object",
      visible: false,
    },
    {
      type: "header",
      visible: false,
    },
    {
      type: "body",
      visible: false,
    },
    {
      type: "relations",
      visible: false,
    },
    {
      type: "inherit",
      visible: false,
    },
  ],
};

const inspectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSPECTOR_ELEMENT_CHANGED_COMPLETED:
      return {
        ...state,
        type: action.type,
        list: action.payload,
      };
    default:
      return state;
  }
};

export const changeInspector = () => ({
  type: INSPECTOR_CHANGED,
});

export default inspectorReducer;
