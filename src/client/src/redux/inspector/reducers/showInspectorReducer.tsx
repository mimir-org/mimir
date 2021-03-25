export const INSPECTOR_TOGGLE_CHANGED = "Insceptor toggle changed";
export const INSPECTOR_TOGGLE_CHANGED_COMPLETED =
  "INSPECTOR_TOGGLE_CHANGED_COMPLETED";

const initialState = { visible: true };

const showInspectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSPECTOR_TOGGLE_CHANGED_COMPLETED:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export const changeToggleInspector = () => ({
  type: INSPECTOR_TOGGLE_CHANGED,
});

export default showInspectorReducer;
