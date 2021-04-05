export const EXPLORER_TOGGLE_CHANGED = "Explorer toggle changed";
export const EXPLORER_TOGGLE_CHANGED_COMPLETED =
  "EXPLORER_TOGGLE_CHANGED_COMPLETED";

const initialState = { visible: true };

const showExplorerReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPLORER_TOGGLE_CHANGED_COMPLETED:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export const changeToggleExplorer = () => ({
  type: EXPLORER_TOGGLE_CHANGED,
});

export default showExplorerReducer;
