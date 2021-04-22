export const INSPECTOR_CHANGED = "Insceptor changed";
export const INSPECTOR_ELEMENT_CHANGED_COMPLETED =
  "INSPECTOR_ELEMENT_CHANGED_COMPLETED";

const initialState = {
  list: [
    {
      type: "admin",
      visible: false,
    },
    {
      type: "tech",
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
    {
      type: "comments",
      visible: false,
    },
    {
      type: "changelog",
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
