export const INSPECTOR_VISIBILITY_CHANGED: string =
  "Insceptor visibility changed";
export const INSPECTOR_VISIBILITY_CHANGED_COMPLETED: string =
  "INSPECTOR_VISIBILITY_CHANGED_COMPLETED";

const initialState = {
  list: [
    {
      type: "object",
      visible: false,
    },
    {
      type: "admin info",
      visible: false,
    },
    {
      type: "tech info",
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

const inspectorReducer = (
  state = initialState,
  action: { type: string; payload: [] }
) => {
  switch (action.type) {
    case INSPECTOR_VISIBILITY_CHANGED_COMPLETED:
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
  type: INSPECTOR_VISIBILITY_CHANGED,
});

export default inspectorReducer;
